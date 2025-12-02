import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { useTextField } from "react-aria";
import type { AriaTextFieldProps } from "react-aria";
import { FieldError } from "react-hook-form";
import cx from "classnames";
import { isString } from "lodash-es";
import styles from "./textarea.module.scss";
import { WarningIcon } from "@components/shared/icons/warning.icon";

type CustomErrorType = {
  message: string;
};

export type TextFieldProps = AriaTextFieldProps & {
  error: FieldError | undefined | CustomErrorType;
  halfWidth?: boolean;
  errorMessage?: string | undefined;
};

const TextAreaField = forwardRef<HTMLTextAreaElement, TextFieldProps>((props, ref) => {
  const { label, error, halfWidth = false, errorMessage = undefined } = props;
  const internalRef = useRef<HTMLTextAreaElement>(null);
  // @ts-ignore
  const { labelProps, inputProps, isInvalid } = useTextField({ ...props, inputElementType: "textarea" }, internalRef);

  useImperativeHandle(ref, () => internalRef.current!);

  return (
    <div className={cx(styles.textFieldWrapper, { [styles.halfWidth]: halfWidth })}>
      <label {...labelProps}>
        <>
          <p className={styles.labelText}>{label}</p>
          <div className={styles.inputWrap}>
            <textarea
              {...inputProps}
              ref={internalRef}
              className={cx(styles.input, { [styles.inputError]: isInvalid })}
            />
            {isInvalid ? <WarningIcon className={styles.iconError} /> : null}
          </div>
          {isInvalid && isString(error?.message) ? (
            <p className={styles.errorText}>
              <span dangerouslySetInnerHTML={{ __html: error.message }} />
            </p>
          ) : null}

          {errorMessage ? (
            <p className={styles.errorText}>
              <span dangerouslySetInnerHTML={{ __html: errorMessage }} />
            </p>
          ) : null}
        </>
      </label>
    </div>
  );
});

export { TextAreaField };
