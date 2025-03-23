
// フォームハンドリング用カスタムフック


import { useState, useCallback, type FormEvent, type ChangeEvent } from 'react';
import * as validator from '@/lib/utils/validation';

/**
 * フォームフィールドの状態
 */
export type FormFieldState = {
  value: string;
  error?: string;
  dirty: boolean;
  touched: boolean;
};

/**
 * フォームの状態
 */
export type FormState = {
  [key: string]: FormFieldState;
};

/**
 * フォームのバリデーションスキーマ
 */
export type ValidationSchema = {
  [key: string]: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    validate?: (value: string, formValues: Record<string, string>) => string | undefined;
    errorMessages?: {
      required?: string;
      minLength?: string;
      maxLength?: string;
      pattern?: string;
    };
  };
};

/**
 * フォーム初期値
 */
export type FormValues = Record<string, string>;

/**
 * useForm フックの戻り値の型
 */
export type UseFormReturn = {
  formState: FormState;
  values: Record<string, string>;
  errors: Record<string, string | undefined>;
  isValid: boolean;
  isDirty: boolean;
  isSubmitting: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleBlur: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmit: (onSubmit: (values: Record<string, string>) => void | Promise<void>) => (e: FormEvent) => void;
  setFieldValue: (name: string, value: string) => void;
  setFieldError: (name: string, error: string) => void;
  reset: () => void;
  getFieldProps: (name: string) => {
    name: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    onBlur: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    error: string | undefined;
  };
};

/**
 * フォーム操作のためのカスタムフック
 * 
 * @param initialValues フォームの初期値
 * @param validationSchema バリデーションスキーマ
 * @returns フォーム操作に必要な関数と状態
 */
export function useForm(
  initialValues: FormValues = {},
  validationSchema: ValidationSchema = {}
): UseFormReturn {
  // フォームの状態を管理
  const [formState, setFormState] = useState<FormState>(() => {
    return Object.keys(initialValues).reduce((acc, key) => {
      acc[key] = {
        value: initialValues[key] || '',
        error: undefined,
        dirty: false,
        touched: false
      };
      return acc;
    }, {} as FormState);
  });

  // 送信中かどうかの状態
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  /**
   * 単一フィールドの検証
   */
  const validateField = useCallback((name: string, value: string): string | undefined => {
    const fieldSchema = validationSchema[name];
    if (!fieldSchema) return undefined;
    
    // 必須チェック
    if (fieldSchema.required && !validator.hasValue(value)) {
      return fieldSchema.errorMessages?.required || '入力してください';
    }
    
    // 最小文字数チェック
    if (fieldSchema.minLength !== undefined && value.length < fieldSchema.minLength) {
      return fieldSchema.errorMessages?.minLength || 
        `${fieldSchema.minLength}文字以上で入力してください`;
    }
    
    // 最大文字数チェック
    if (fieldSchema.maxLength !== undefined && value.length > fieldSchema.maxLength) {
      return fieldSchema.errorMessages?.maxLength || 
        `${fieldSchema.maxLength}文字以内で入力してください`;
    }
    
    // パターンチェック
    if (fieldSchema.pattern && !fieldSchema.pattern.test(value)) {
      return fieldSchema.errorMessages?.pattern || '形式が正しくありません';
    }
    
    // カスタムバリデーション
    if (fieldSchema.validate) {
      const values = Object.entries(formState).reduce((acc, [key, field]) => {
        acc[key] = field.value;
        return acc;
      }, {} as Record<string, string>);
      
      return fieldSchema.validate(value, values);
    }
    
    return undefined;
  }, [validationSchema, formState]);
  
  /**
   * すべてのフィールドの検証
   */
  const validateForm = useCallback(() => {
    const newFormState = { ...formState };
    let isValid = true;
    
    for (const name of Object.keys(newFormState)) {
      const error = validateField(name, newFormState[name].value);
      newFormState[name] = {
        ...newFormState[name],
        error
      };
      
      if (error) {
        isValid = false;
      }
    }
    
    setFormState(newFormState);
    return isValid;
  }, [formState, validateField]);
  
  /**
   * フィールド値の変更ハンドラ
   */
  const handleChange = useCallback((
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    setFormState(prev => ({
      ...prev,
      [name]: {
        ...prev[name],
        value,
        dirty: true,
        error: validateField(name, value)
      }
    }));
  }, [validateField]);
  
  /**
   * フィールドのブラーハンドラ
   */
  const handleBlur = useCallback((
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    setFormState(prev => ({
      ...prev,
      [name]: {
        ...prev[name],
        touched: true,
        error: validateField(name, value)
      }
    }));
  }, [validateField]);
  
  /**
   * フォームの送信ハンドラ
   */
  const handleSubmit = useCallback((
    onSubmit: (values: Record<string, string>) => void | Promise<void>
  ) => {
    return async (e: FormEvent) => {
      e.preventDefault();
      
      // すべてのフィールドをtouchedに設定
      setFormState(prev => {
        const updated = { ...prev };
        for (const key of Object.keys(updated)) {
          updated[key] = {
            ...updated[key],
            touched: true
          };
        }
        return updated;
      });
      
      // フォームの検証
      const isValid = validateForm();
      if (!isValid) return;
      
      // 送信中フラグをセット
      setIsSubmitting(true);
      
      try {
        // 値のみを抽出
        const values = Object.entries(formState).reduce((acc, [key, field]) => {
          acc[key] = field.value;
          return acc;
        }, {} as Record<string, string>);
        
        // 送信処理
        await onSubmit(values);
      } catch (error) {
        console.error('Form submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    };
  }, [formState, validateForm]);
  
  /**
   * フィールド値を直接設定する
   */
  const setFieldValue = useCallback((name: string, value: string) => {
    setFormState(prev => ({
      ...prev,
      [name]: {
        ...prev[name],
        value,
        dirty: true
      }
    }));
  }, []);
  
  /**
   * フィールドエラーを直接設定する
   */
  const setFieldError = useCallback((name: string, error: string) => {
    setFormState(prev => ({
      ...prev,
      [name]: {
        ...prev[name],
        error
      }
    }));
  }, []);
  
  /**
   * フォームをリセットする
   */
  const reset = useCallback(() => {
    setFormState(Object.keys(initialValues).reduce((acc, key) => {
      acc[key] = {
        value: initialValues[key] || '',
        error: undefined,
        dirty: false,
        touched: false
      };
      return acc;
    }, {} as FormState));
  }, [initialValues]);
  
  /**
   * フィールドのプロパティを取得する
   */
  const getFieldProps = useCallback((name: string) => {
    return {
      name,
      value: formState[name]?.value || '',
      onChange: handleChange,
      onBlur: handleBlur,
      error: formState[name]?.error
    };
  }, [formState, handleChange, handleBlur]);
  
  // 値のみを抽出
  const values = Object.entries(formState).reduce((acc, [key, field]) => {
    acc[key] = field.value;
    return acc;
  }, {} as Record<string, string>);
  
  // エラーのみを抽出
  const errors = Object.entries(formState).reduce((acc, [key, field]) => {
    acc[key] = field.error;
    return acc;
  }, {} as Record<string, string | undefined>);
  
  // フォーム全体が有効かどうか
  const isValid = Object.values(formState).every(field => !field.error);
  
  // フォームが変更されたかどうか
  const isDirty = Object.values(formState).some(field => field.dirty);
  
  return {
    formState,
    values,
    errors,
    isValid,
    isDirty,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldError,
    reset,
    getFieldProps
  };
} 