import {
  OnValueChange,
  Props,
  getCurrentFromRef,
} from "@create-figma-plugin/ui";
import { MIXED_STRING } from "@create-figma-plugin/utilities";
import clsx from "clsx";
import { JSX, RefObject, h } from "preact";
import { useCallback, useRef, useState } from "preact/hooks";
import styles from "./textbox-multiline.module.css";

const EMPTY_STRING = "";

export type TextboxMultilineProps<Name extends string> = {
  grow?: boolean;
  disabled?: boolean;
  name?: Name;
  onInput?: OmitThisParameter<JSX.GenericEventHandler<HTMLTextAreaElement>>;
  onValueInput?: OnValueChange<string, Name>;
  placeholder?: string;
  propagateEscapeKeyDown?: boolean;
  revertOnEscapeKeyDown?: boolean;
  rows?: number;
  spellCheck?: boolean;
  validateOnBlur?: (value: string) => string | boolean;
  value: string;
  variant?: TextboxMultilineVariant;
};

export type TextboxMultilineVariant = "border" | "underline";

export function TextboxMultiline<Name extends string>({
  grow = false,
  disabled = false,
  name,
  onInput = function () {},
  onValueInput = function () {},
  placeholder,
  propagateEscapeKeyDown = true,
  revertOnEscapeKeyDown = false,
  rows = 3,
  spellCheck = false,
  validateOnBlur,
  variant,
  value,
  ...rest
}: Props<HTMLTextAreaElement, TextboxMultilineProps<Name>>): JSX.Element {
  const textAreaElementRef: RefObject<HTMLTextAreaElement> = useRef(null);
  const revertOnEscapeKeyDownRef: RefObject<boolean> = useRef(false); // Boolean flag to exit early from `handleBlur`

  const [originalValue, setOriginalValue] = useState(EMPTY_STRING); // Value of the textbox when it was initially focused

  const setTextAreaElementValue = useCallback(function (value: string): void {
    const textAreaElement = getCurrentFromRef(textAreaElementRef);
    textAreaElement.value = value;
    const inputEvent = document.createEvent("Event");
    inputEvent.initEvent("input", true, true);
    textAreaElement.dispatchEvent(inputEvent);
  }, []);

  const handleBlur = useCallback(
    function (): void {
      if (revertOnEscapeKeyDownRef.current === true) {
        revertOnEscapeKeyDownRef.current = false;
        return;
      }
      if (typeof validateOnBlur !== "undefined") {
        const result = validateOnBlur(value);
        if (typeof result === "string") {
          // Set to the value returned by `validateOnBlur`
          setTextAreaElementValue(result);
          setOriginalValue(EMPTY_STRING);
          return;
        }
        if (result === false) {
          // Revert the original value
          if (value !== originalValue) {
            setTextAreaElementValue(originalValue);
          }
          setOriginalValue(EMPTY_STRING);
          return;
        }
      }
      setOriginalValue(EMPTY_STRING);
    },
    [originalValue, setTextAreaElementValue, validateOnBlur, value],
  );

  const handleFocus = useCallback(
    function (): void {
      setOriginalValue(value);
    },
    [value],
  );

  const handleInput = useCallback(
    function (event: JSX.TargetedEvent<HTMLTextAreaElement>): void {
      onValueInput(event.currentTarget.value, name);
      onInput(event);
    },
    [name, onInput, onValueInput],
  );

  const handleKeyDown = useCallback(
    function (event: JSX.TargetedKeyboardEvent<HTMLTextAreaElement>): void {
      if (event.key === "Escape") {
        if (propagateEscapeKeyDown === false) {
          event.stopPropagation();
        }
        if (revertOnEscapeKeyDown === true) {
          revertOnEscapeKeyDownRef.current = true;
          setTextAreaElementValue(originalValue);
          setOriginalValue(EMPTY_STRING);
        }
        event.currentTarget.blur();
        return;
      }
      if (
        value === MIXED_STRING &&
        isKeyCodeCharacterGenerating(event.keyCode) === false
      ) {
        // Prevent changing the cursor position with the keyboard if `value` is `MIXED_STRING`
        event.preventDefault();
        event.currentTarget.select();
      }
    },
    [
      originalValue,
      propagateEscapeKeyDown,
      revertOnEscapeKeyDown,
      setTextAreaElementValue,
      value,
    ],
  );

  const handleMouseUp = useCallback(
    function (event: JSX.TargetedMouseEvent<HTMLTextAreaElement>): void {
      if (value === MIXED_STRING) {
        // Prevent changing the selection if `value` is `MIXED_STRING`
        event.preventDefault();
      }
    },
    [value],
  );

  return (
    <div
      className={clsx([
        styles.textboxMultiline,
        typeof variant === "undefined"
          ? null
          : variant === "border"
          ? styles.hasBorder
          : null,
        grow === true ? styles.grow : null,
        disabled === true ? styles.disabled : null,
      ])}
    >
      {grow === true ? (
        <div className={styles.ghost}>
          {value === MIXED_STRING ? "Mixed" : `${value} `}
        </div>
      ) : null}
      <textarea
        {...rest}
        ref={textAreaElementRef}
        className={styles.textarea}
        disabled={disabled === true}
        name={name}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onMouseUp={handleMouseUp}
        placeholder={placeholder}
        rows={rows}
        spellCheck={spellCheck}
        tabIndex={disabled === true ? -1 : 0}
        value={value === MIXED_STRING ? "Mixed" : value}
      />
      <div className={styles.border} />
      {variant === "underline" ? <div className={styles.underline} /> : null}
    </div>
  );
}

function isKeyCodeCharacterGenerating(keyCode: number): boolean {
  return (
    keyCode === 32 || // space
    (keyCode >= 48 && keyCode <= 57) || // 0 to 9
    (keyCode >= 65 && keyCode <= 90) || // A to Z
    (keyCode >= 96 && keyCode <= 105) || // Number pad
    (keyCode >= 186 && keyCode <= 192) || // ;=,-./`
    (keyCode >= 219 && keyCode <= 222) // [\]'
  );
}
