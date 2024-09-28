import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";

export type SignUpType = {
  className?: string;

  /** Style props */
  propWidth?: CSSProperties["width"];
  propTextDecoration?: CSSProperties["textDecoration"];
  propFontWeight?: CSSProperties["fontWeight"];
  propDisplay?: CSSProperties["display"];
  propMinWidth?: CSSProperties["minWidth"];
  signUpPosition?: CSSProperties["position"];
  signUpTop?: CSSProperties["top"];
  signUpLeft?: CSSProperties["left"];
  signUpHeight?: CSSProperties["height"];
  signUpDisplay?: CSSProperties["display"];
  signUpFlexDirection?: CSSProperties["flexDirection"];
  signUpPadding?: CSSProperties["padding"];
  rectangleDivTop?: CSSProperties["top"];
  rectangleDivRight?: CSSProperties["right"];
  rectangleDivBottom?: CSSProperties["bottom"];
  rectangleDivLeft?: CSSProperties["left"];
  rectangleDivMargin?: CSSProperties["margin"];
  signUpPosition1?: CSSProperties["position"];
  signUpHeight1?: CSSProperties["height"];
  signUpWidth?: CSSProperties["width"];
  signUpTop1?: CSSProperties["top"];
  signUpLeft1?: CSSProperties["left"];
  signUpFlex?: CSSProperties["flex"];
};

const SignUp: NextPage<SignUpType> = ({
  className = "",
  propWidth,
  propTextDecoration,
  propFontWeight,
  propDisplay,
  propMinWidth,
  signUpPosition,
  signUpTop,
  signUpLeft,
  signUpHeight,
  signUpDisplay,
  signUpFlexDirection,
  signUpPadding,
  rectangleDivTop,
  rectangleDivRight,
  rectangleDivBottom,
  rectangleDivLeft,
  rectangleDivMargin,
  signUpPosition1,
  signUpHeight1,
  signUpWidth,
  signUpTop1,
  signUpLeft1,
  signUpFlex,
}) => {
  const signUpStyle: CSSProperties = useMemo(() => {
    return {
      width: propWidth,
      position: signUpPosition,
      top: signUpTop,
      left: signUpLeft,
      height: signUpHeight,
      display: signUpDisplay,
      flexDirection: signUpFlexDirection,
      padding: signUpPadding,
    };
  }, [
    propWidth,
    signUpPosition,
    signUpTop,
    signUpLeft,
    signUpHeight,
    signUpDisplay,
    signUpFlexDirection,
    signUpPadding,
  ]);

  const signUp1Style: CSSProperties = useMemo(() => {
    return {
      textDecoration: propTextDecoration,
      fontWeight: propFontWeight,
      display: propDisplay,
      minWidth: propMinWidth,
      position: signUpPosition1,
      height: signUpHeight1,
      width: signUpWidth,
      top: signUpTop1,
      left: signUpLeft1,
      flex: signUpFlex,
    };
  }, [
    propTextDecoration,
    propFontWeight,
    propDisplay,
    propMinWidth,
    signUpPosition1,
    signUpHeight1,
    signUpWidth,
    signUpTop1,
    signUpLeft1,
    signUpFlex,
  ]);

  const cTASignUpBackgroundStyle: CSSProperties = useMemo(() => {
    return {
      top: rectangleDivTop,
      right: rectangleDivRight,
      bottom: rectangleDivBottom,
      left: rectangleDivLeft,
      margin: rectangleDivMargin,
    };
  }, [
    rectangleDivTop,
    rectangleDivRight,
    rectangleDivBottom,
    rectangleDivLeft,
    rectangleDivMargin,
  ]);

  return (
    <div
      className={`w-[108.5px] flex flex-row items-start justify-start pt-[11.3px] px-6 pb-[11.4px] box-border relative z-[1] text-center text-sm text-white font-sarabun ${className}`}
      style={signUpStyle}
    >
      <div
        className="h-full w-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px] rounded-31xl-5 bg-fuchsia"
        style={cTASignUpBackgroundStyle}
      />
      <b className="flex-1 justify-center items-center relative z-[1]" style={signUp1Style}>
        Sign up
      </b>
    </div>
  );
};

export default SignUp;
