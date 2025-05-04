import { useState, useEffect } from "react";

const useForm = (initialState, validate, onSubmit) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Helper to validate and set errors
  const runValidation = (currentValues) => {
    const validationErrors = validate(currentValues);
    setErrors(validationErrors);
    return validationErrors;
  };

  // Re-validate on value or touch change
  useEffect(() => {
    if (Object.keys(touched).length > 0) {
      runValidation(values);
    }
  }, [values, touched]);

  // Handle submit trigger
  useEffect(() => {
    if (isSubmitting) {
      const validationErrors = runValidation(values);
      setTouched(
        Object.keys(initialState).reduce((acc, key) => {
          acc[key] = true;
          return acc;
        }, {})
      );

      if (Object.keys(validationErrors).length === 0) {
        onSubmit();
      }

      setIsSubmitting(false);
    }
  }, [isSubmitting]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  };

  const resetForm = () => {
    setValues(initialState);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  };
};

export default useForm;
