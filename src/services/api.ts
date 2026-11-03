import type { ErroApi } from "../types/api";

// Endereço da API Java publicada; definido no .env local e nas variáveis da Vercel
const API_URL = import.meta.env.VITE_API_URL;

// Função base usada por todos os serviços: monta a URL, faz o fetch,
// confere response.ok e converte o JSON no tipo esperado.
export async function requisitar<T>(caminho: string, opcoes: RequestInit = {}): Promise<T> {
  let resposta: Response;

  try {
    resposta = await fetch(`${API_URL}${caminho}`, {
      ...opcoes,
      headers: opcoes.body ? { "Content-Type": "application/json" } : undefined,
    });
  } catch {
    // fetch só rejeita quando não há resposta: sem internet ou API fora do ar
    throw new Error(
      "Não foi possível conectar à API do SoulUp. Verifique a internet e tente novamente.",
    );
  }

  if (!resposta.ok) {
    throw new Error(await lerMensagemDeErro(resposta));
  }

  // 204 No Content (exclusões) não possui corpo para converter
  if (resposta.status === 204) {
    return undefined as T;
  }

  return (await resposta.json()) as T;
}

// Usa a mensagem enviada pela API; se não houver, monta uma pelo status
async function lerMensagemDeErro(resposta: Response): Promise<string> {
  try {
    const erro = (await resposta.json()) as ErroApi;
    const primeiraValidacao = erro.errors?.find((item) => item.defaultMessage);
    if (primeiraValidacao?.defaultMessage) {
      return primeiraValidacao.defaultMessage;
    }
    if (erro.message) {
      return erro.message;
    }
  } catch {
    // corpo vazio ou que não é JSON: segue para a mensagem padrão
  }
  return `A API respondeu com erro (${resposta.status}).`;
}
