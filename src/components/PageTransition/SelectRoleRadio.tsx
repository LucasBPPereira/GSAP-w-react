import { cn } from "@/utils/cn";
import { cva } from "class-variance-authority";
import {
  cloneElement,
  LabelHTMLAttributes,
  memo,
  ReactElement,
  SVGProps,
} from "react";

const colorsLabel = cva(
  "group relative flex items-center border-2 w-full h-14 transition-all duration-300 rounded-lg cursor-pointer px-4 focus-within:ring-2 ring-offset-2",
  {
    variants: {
      role: {
        default: " bg-transparent",
        desenvolvedor:
          "hover:bg-blue-50 hover:border-blue-400 bg-blue-50 border-blue-400", // Cor para Desenvolvedor (Azul)
        recrutador:
          "hover:bg-purple-50 bg-purple-50 hover:border-purple-500 border-purple-500", // Cor para Recrutador (Roxo)
        usuario:
          "hover:bg-green-50 bg-green-50 hover:border-green-500 border-green-500", // Cor para Usuário (Verde)
      },
    },
    defaultVariants: {
      role: "default", // Valor padrão (caso não passe o role)
    },
  }
);

type TClassNameLabel = Pick<LabelHTMLAttributes<HTMLLabelElement>, "className">;

interface ISelectRoleRadio {
  nameRole: string;
  valueRole: "desenvolvedor" | "recrutador" | "usuario";
  selectedRole: string;
  setSelectedRole: (value: string) => void;
  Icon: ReactElement<SVGProps<SVGSVGElement>>;
  classLabel?: TClassNameLabel;
}

export const SelectRoleRadio = memo(
  ({
    nameRole,
    valueRole,
    selectedRole,
    setSelectedRole,
    Icon,
    classLabel,
  }: ISelectRoleRadio) => { 
    
    return (
      <label
        className={cn(
          colorsLabel({ role: valueRole === selectedRole ? selectedRole : "default", className: classLabel?.className}) 
        )}
      >
        <input
          type="radio"
          name="role"
          value={valueRole}
          onChange={() => setSelectedRole(valueRole)}
          checked={selectedRole === valueRole}
          className="absolute opacity-0 w-0 h-0"
        />
        <span className="text-zinc-800 font-geist">{nameRole}</span>
        <div className="absolute right-5">
          {cloneElement(Icon, {
            className: `transition-colors duration-300 ${
              Icon.props.className || ""
            }`,
          })}
        </div>
      </label>
    );
  },
  (prevProps, nextProps) => {
    // 🔥 Evita rerenderização se selectedRole não mudou para este botão
    return prevProps.selectedRole === nextProps.selectedRole;
  }
);

SelectRoleRadio.displayName = "SelectRoleRadio";
