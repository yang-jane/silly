interface ButtonProps {
  onClick?: () => void;
  label?: string;
}
export default function Button(props: ButtonProps): React.ReactNode {
  const { onClick, label = "Button" } = props;
  return (
    <button className="bg-blue" onClick={onClick}>
      {label}
    </button>
  );
}
