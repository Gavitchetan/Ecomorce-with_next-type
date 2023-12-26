import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import React, { FC, useState } from 'react';
import { IconType } from 'react-icons';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface InputProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    register?: UseFormRegister<FieldValues> | undefined;
    errors: FieldErrors;
    required?: boolean;
    Icons?: IconType;
    defaultValue?: string,
}

const Input: FC<InputProps> = ({
    id,
    label,
    Icons,
    type,
    disabled,
    register,
    errors,
    required,
    defaultValue
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const inputType = showPassword ? 'text' : type || 'text';

    return (
        <div className="relative w-[70%] mt-4 mb-4">
            <label htmlFor={id} className="block text-slate-700 font-medium">
                {label}
            </label>
            <div className="relative">
                <input
                    placeholder={label}
                    autoComplete="off"
                    {...register?.(id, { required })}
                    disabled={disabled}
                    type={inputType}
                    className={`w-full p-4 pt-6 text-sm text-slate-700 outline-none bottom-2 border border-slate-300 rounded-md transition disabled:opacity-70 disabled:cursor-not-allowed ${errors[id]
                        ? 'border-b-2 border-rose-400 focus:border-rose-400'
                        : 'focus:border-slate-300'
                        } ${errors[id] ? 'text-rose-400' : 'text-slate-400'
                        } placeholder-slate-400`}
                />
                {Icons && type === 'password' && (
                    <button
                        className="absolute top-2 right-2"
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                )}
            </div>
            {errors[id] && (
                <span className="block mt-1 text-sm text-rose-400">
                    {/* Display your error message here */}
                    This field is required.
                </span>
            )}
        </div>
    );
};

export default Input;
