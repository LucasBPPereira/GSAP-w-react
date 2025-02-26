"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { SelectRoleRadio } from "./SelectRoleRadio";
import { CodeXml, User, UserSearch } from "lucide-react";
import Link from "next/link";
import { GitHubIcon } from "@/assets/icons/GithubIcon";
import { LinkedinIcon } from "@/assets/icons/LinkedinIcon";
import { cn } from "@/utils/cn";

const RevealCircle: React.FC = () => {
  // Ref para o círculo da máscara
  const circleRef = useRef<SVGCircleElement>(null);
  const textRef = useRef(null);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [selectedRole, setSelectedRole] = useState<string>("usuario");
  const [isRevealed, setIsRevealed] = useState(false);
  const [isDivRevealed, setIsDivRevealed] = useState(true);
  const [seconds, setSeconds] = useState(10);

  let roleMessages = "";

  switch (selectedRole) {
    case "desenvolvedor":
      roleMessages = "Faaala dev, salve salve!";
      break;
    case "recrutador":
      roleMessages = "Olá recrutador(a), seja bem vindo!";
      break;
    case "usuario":
      roleMessages = "Olá, espero que esteja tudo bem com você!";
      break;
    default:
      break;
  }

  const useSetSelectedRole = useCallback((role: string) => {
    setSelectedRole((prev) => (prev !== role ? role : prev));
  }, []);

  const handleClick = () => {
    setIsRevealed(true);
  };
  // Função para atualizar as dimensões da tela
  const updateViewport = () => {
    setViewport({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    if (seconds <= 0) {
      handleClick();
      return;
    }
    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  useEffect(() => {
    updateViewport();
    window.addEventListener("resize", updateViewport);

    return () => {
      window.removeEventListener("resize", updateViewport);
    };
  }, []);

  useEffect(() => {
    // Se a animação for acionada, iniciar a animação do círculo
    if (isRevealed && circleRef.current) {
      gsap.fromTo(
        circleRef.current,
        { r: 0 },
        { r: 1500, duration: 3, ease: "power2.inOut" }
      );
      gsap.fromTo(
        ".textRef",
        { opacity: 0 },
        {
          opacity: 1,
          y: -20,
          stagger: 0.3,
          delay: 2,
          duration: 1,
          ease: "power3.out",
        }
      );
      gsap.fromTo(
        ".initialFrame",
        { opacity: 1 },
        {
          opacity: 0,
          delay: 1,
          duration: 3,
          onComplete: () => {
            setIsDivRevealed(false);
          },
        }
      );
      gsap.to(".socialIcons", { // for user and developer
        y: -10,
        delay: 3,
        stagger: 0.2,
        yoyo: true,
        repeat: -1,
        duration: 3,
        ease: "elastic.inOut",
      })
      gsap.to(".content", { mask: "none", delay: 3 });
    }
  }, [isRevealed]);

  return (
    <div className="conG relative w-full h-screen flex flex-col items-center justify-center ">
      {/* Cor de fundo de sobreposição */}
      {isDivRevealed && (
        <div
          className={`initialFrame absolute inset-0 bg-blue-300 ${
            !isRevealed && "z-10"
          }`}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center py-3 px-5 max-w-80 w-[calc(100%-10px)] bg-white border-2 rounded-lg space-y-4">
            <SelectRoleRadio
              nameRole="Desenvolvedor"
              valueRole="desenvolvedor"
              selectedRole={selectedRole}
              setSelectedRole={useSetSelectedRole}
              Icon={
                <CodeXml
                  className={`group-hover:stroke-blue-500 ${
                    selectedRole === "desenvolvedor"
                      ? "stroke-blue-500"
                      : "stroke-zinc-800"
                  }`}
                />
              }
            />
            <SelectRoleRadio
              nameRole="Recrutador"
              valueRole="recrutador"
              selectedRole={selectedRole}
              setSelectedRole={useSetSelectedRole}
              Icon={
                <UserSearch
                  className={`group-hover:stroke-purple-500 ${
                    selectedRole === "recrutador"
                      ? "stroke-purple-500"
                      : "stroke-zinc-800"
                  }`}
                />
              }
            />
            <SelectRoleRadio
              nameRole="Usuário"
              valueRole="usuario"
              selectedRole={selectedRole}
              setSelectedRole={useSetSelectedRole}
              Icon={
                <User
                  className={`group-hover:stroke-green-500 ${
                    selectedRole === "usuario"
                      ? "stroke-green-500"
                      : "stroke-zinc-800"
                  }`}
                />
              }
            />

            <div className="flex flex-col items-center p-4 border rounded-lg shadow-sm w-full">
              <h1 className="text-lg font-bold text-blue-600">
                Contagem Regressiva
              </h1>
              <p className="text-3xl font-mono mt-2 text-blue-950">{seconds}</p>
            </div>
            <button
              onClick={handleClick}
              className="px-4 py-2 w-full bg-blue-500 text-white rounded-md font-bold"
            >
              Veja
            </button>
          </div>
        </div>
      )}

      {/* O SVG é utilizado como máscara */}
      {isDivRevealed && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox={`0 0 ${viewport.width} ${viewport.height}`}
          className={`maskSVG absolute ${isRevealed && "z-20"}`}
        >
          <defs>
            <mask id="theMask">
              <circle
                ref={circleRef}
                cx={viewport.width / 2}
                cy={viewport.height / 2}
                r="0"
                fill="#fff"
              />
            </mask>
          </defs>
        </svg>
      )}

      <main
        className={`content text-white text-center relative ${
          isRevealed && "z-30"
        } p-6 flex gap-2 flex-col items-center h-full w-full bg-white`}
      >
        <div className="h-14 w-96 rounded-lg border-2 border-blue-600 shadow-md bg-white">
          <nav className="flex items-center h-full">
            <Link
              className="text-zinc-800 font-semibold font-geist px-4 py-2 "
              href={"#"}
            >
              Home
            </Link>
          </nav>
        </div>
        <div className="flex flex-col gap-4 justify-center items-center">
          {selectedRole && (
            <h1
              ref={textRef}
              className="textRef text-3xl px-5 py-2 mt-14 rounded-lg bg-gradient-to-r from-blue-500 to-sky-500 font-bold text-white font-geist shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
            >
              {roleMessages}
            </h1>
          )}
          <div className="flex gap-2 items-center px-2 py-1 rounded-sm mt-10">
            <div className="w-3/5">
              <p
                ref={textRef}
                className="textRef mt-4 text-left indent-4 text-zinc-800 font-geist"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum enim quas mollitia natus fugit, aliquid consequuntur libero laborum quo porro nam voluptatem, quasi tempora quam labore, sed minima sint magnam.
              </p>
            </div>
            {selectedRole !== "recrutador" ? (
              <div className={cn("textRef relative w-2/5 h-64 rounded-lg bg-sky-500 shadow-[12px_8px_2px_2px_#90cdf4] ", selectedRole !== "recrutador" && "rotate-3")}>
              <div className={cn("absolute group top-7 left-40 bg-white flex items-center justify-center rounded-full h-10 w-10 hover:bg-purple-700 transition-colors duration-700 cursor-pointer", selectedRole !== "recrutador" && "socialIcons")}>
                <Link
                  href={"https://github.com/LucasBPPereira"}
                  target="_blank"
                >
                  <GitHubIcon className="stroke-purple-900 group-hover:stroke-white transition-colors duration-700" />
                </Link>
              </div>
              <div className={cn("absolute group top-36 left-8 h-10 w-10 rounded-full flex items-center justify-center bg-white hover:bg-blue-600 transition-colors duration-700 cursor-pointer ", selectedRole !== "recrutador" && "socialIcons")}>
                <Link href={"https://www.linkedin.com/in/lucas-base04/"}>
                <LinkedinIcon className="stroke-blue-600 group-hover:stroke-white transition-colors duration-700" />
                </Link>
              </div>
            </div>
            ) : (
              <div className="h-64 border-2 bg-blue-500 max-w-96 w-full rounded-lg">
                
              </div>
            )}
          </div>
        </div>
      </main>

      <style jsx>{`
        .content {
          mask: url(#theMask);
          -webkit-mask: url(#theMask);
          transition: opacity 1s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default RevealCircle;
