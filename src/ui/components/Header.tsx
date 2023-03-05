interface IHeader {
  title: string;
}

export const Header: FC<IHeader> = ({ title, children }) => {
  return (
    <div className="header">
      <div className="title">{title}</div>
      {children}
    </div>
  );
};
