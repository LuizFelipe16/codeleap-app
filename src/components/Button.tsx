import commonStyles from '../styles/pages/common.module.scss';

interface IButtonProps {
  text: string;
  onClick: () => void;

  value?: string;
}

export function Button({ text, value = '', onClick }: IButtonProps) {
  return (
    <button
      className={`
              ${commonStyles.bottom} 
              ${value.length < 3 && commonStyles.deactivate}
            `}
      onClick={onClick}
    >
      {text}
    </button>
  );
}