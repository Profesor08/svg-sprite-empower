type FC<P = {}> = React.FC<React.PropsWithChildren<P>>;

type VFC<P = {}> = React.FC<P>;

type Space = "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

type FigmaMessageEvent = MessageEvent<{
  pluginMessage: Api.Message;
}>;

declare const root: HTMLDivElement;
