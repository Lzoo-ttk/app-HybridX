"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se usuário já está logado
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.push("/");
      }
      setLoading(false);
    });

    // Escutar mudanças de autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.push("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00FF7F]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo e Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-[#00FF7F] to-[#004D00] mb-4 shadow-2xl shadow-[#00FF7F]/30">
            <span className="text-4xl">⚡</span>
          </div>
          <h1 className="text-4xl font-bold text-[#00FF7F] mb-2">HybridX</h1>
          <p className="text-gray-400">Premium Training Experience</p>
        </div>

        {/* Card de Autenticação */}
        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] rounded-3xl p-8 border border-[#00FF7F]/10 shadow-2xl">
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: "#00FF7F",
                    brandAccent: "#004D00",
                    brandButtonText: "#0D0D0D",
                    defaultButtonBackground: "#1A1A1A",
                    defaultButtonBackgroundHover: "#2A2A2A",
                    defaultButtonBorder: "#00FF7F",
                    defaultButtonText: "#00FF7F",
                    dividerBackground: "#2A2A2A",
                    inputBackground: "#1A1A1A",
                    inputBorder: "#2A2A2A",
                    inputBorderHover: "#00FF7F",
                    inputBorderFocus: "#00FF7F",
                    inputText: "#FFFFFF",
                    inputLabelText: "#9CA3AF",
                    inputPlaceholder: "#6B7280",
                    messageText: "#9CA3AF",
                    messageTextDanger: "#EF4444",
                    anchorTextColor: "#00FF7F",
                    anchorTextHoverColor: "#004D00",
                  },
                  space: {
                    spaceSmall: "8px",
                    spaceMedium: "16px",
                    spaceLarge: "24px",
                  },
                  fontSizes: {
                    baseBodySize: "14px",
                    baseInputSize: "16px",
                    baseLabelSize: "14px",
                    baseButtonSize: "16px",
                  },
                  fonts: {
                    bodyFontFamily: "Inter, sans-serif",
                    buttonFontFamily: "Inter, sans-serif",
                    inputFontFamily: "Inter, sans-serif",
                    labelFontFamily: "Inter, sans-serif",
                  },
                  borderWidths: {
                    buttonBorderWidth: "1px",
                    inputBorderWidth: "1px",
                  },
                  radii: {
                    borderRadiusButton: "12px",
                    buttonBorderRadius: "12px",
                    inputBorderRadius: "12px",
                  },
                },
              },
              className: {
                container: "auth-container",
                button: "auth-button",
                input: "auth-input",
                label: "auth-label",
              },
            }}
            localization={{
              variables: {
                sign_in: {
                  email_label: "Email",
                  password_label: "Senha",
                  email_input_placeholder: "seu@email.com",
                  password_input_placeholder: "Sua senha",
                  button_label: "Entrar",
                  loading_button_label: "Entrando...",
                  social_provider_text: "Entrar com {{provider}}",
                  link_text: "Já tem uma conta? Entre",
                },
                sign_up: {
                  email_label: "Email",
                  password_label: "Senha",
                  email_input_placeholder: "seu@email.com",
                  password_input_placeholder: "Crie uma senha",
                  button_label: "Criar conta",
                  loading_button_label: "Criando conta...",
                  social_provider_text: "Cadastrar com {{provider}}",
                  link_text: "Não tem uma conta? Cadastre-se",
                },
                forgotten_password: {
                  email_label: "Email",
                  password_label: "Senha",
                  email_input_placeholder: "seu@email.com",
                  button_label: "Enviar instruções",
                  loading_button_label: "Enviando...",
                  link_text: "Esqueceu sua senha?",
                },
              },
            }}
            providers={[]}
            redirectTo={typeof window !== "undefined" ? window.location.origin : ""}
          />
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Transforme seu corpo com treino híbrido inteligente
        </p>
      </div>
    </div>
  );
}
