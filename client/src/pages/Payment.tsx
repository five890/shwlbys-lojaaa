import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Copy, Check, Upload, ArrowLeft } from "lucide-react";

interface CheckoutData {
  cartItems: any[];
  formData: any;
  total: number;
}

export default function Payment() {
  const [, setLocation] = useLocation();
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);
  const [copied, setCopied] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const pixKey = "4cd768c3-b51e-4ec5-b64b-f9ed40be6561";

  useEffect(() => {
    const data = localStorage.getItem("checkoutData");
    if (!data) {
      setLocation("/");
      return;
    }
    setCheckoutData(JSON.parse(data));
  }, [setLocation]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmitProof = async () => {
    if (!file) {
      alert("Por favor, selecione um arquivo");
      return;
    }

    // Validate file type
    const validTypes = ["image/png", "image/jpeg", "application/pdf"];
    if (!validTypes.includes(file.type)) {
      alert("Apenas PNG, JPG e PDF são aceitos");
      return;
    }

    setUploading(true);

    // Simulate file upload
    setTimeout(() => {
      // Store order data
      const orderData = {
        ...checkoutData,
        proofFile: file.name,
        proofUploadedAt: new Date().toISOString(),
        status: "Aguardando Validação",
        orderId: `PED-${Date.now()}`,
      };

      localStorage.setItem("lastOrder", JSON.stringify(orderData));
      localStorage.removeItem("checkoutData");

      setUploading(false);
      setSubmitted(true);

      // Show notification
      setTimeout(() => {
        setLocation("/my-orders");
      }, 3000);
    }, 2000);
  };

  if (!checkoutData) return null;

  if (submitted) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-400" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-4">Comprovante Recebido!</h1>
          <p className="text-muted-foreground mb-4">
            Seu comprovante está sendo validado pela loja. Você pode acompanhar o status em "Meus Pedidos".
          </p>
          <p className="text-sm text-accent font-medium">Redirecionando em 3 segundos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground py-12">
      <div className="container mx-auto px-4">
        <button
          onClick={() => setLocation("/cart")}
          className="flex items-center gap-2 text-accent hover:text-accent/80 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para o carrinho
        </button>

        <h1 className="text-3xl font-bold text-foreground mb-8">Pagamento via PIX</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Instructions */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-lg p-8 mb-8">
              <h2 className="text-xl font-bold text-foreground mb-6">Instruções de Pagamento</h2>

              <div className="space-y-6">
                {/* Step 1 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Copie a chave PIX</h3>
                    <p className="text-muted-foreground mb-3">Clique no botão abaixo para copiar a chave PIX</p>
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition"
                    >
                      <Copy className="w-4 h-4" />
                      {copied ? "Copiado!" : "Copiar Chave PIX"}
                    </button>
                    <div className="mt-3 p-3 bg-muted rounded-lg">
                      <code className="text-sm text-foreground break-all">{pixKey}</code>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Faça a transferência</h3>
                    <p className="text-muted-foreground">
                      Abra seu aplicativo bancário ou de pagamento e realize a transferência PIX para a chave acima.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Envie o comprovante</h3>
                    <p className="text-muted-foreground">
                      Faça uma captura de tela do comprovante de pagamento e envie abaixo.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Upload Proof */}
            <div className="bg-card border border-border rounded-lg p-8">
              <h2 className="text-xl font-bold text-foreground mb-6">Enviar Comprovante</h2>

              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center mb-6 hover:border-accent transition cursor-pointer">
                <input
                  type="file"
                  accept=".png,.jpg,.jpeg,.pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  id="proof-upload"
                />
                <label htmlFor="proof-upload" className="cursor-pointer">
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-foreground font-medium mb-2">
                    {file ? file.name : "Clique para selecionar ou arraste o arquivo"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Formatos aceitos: PNG, JPG, PDF (máximo 5MB)
                  </p>
                </label>
              </div>

              {file && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <p className="text-sm text-green-400">✓ Arquivo selecionado: {file.name}</p>
                </div>
              )}

              <Button
                onClick={handleSubmitProof}
                disabled={!file || uploading}
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 py-3 disabled:opacity-50"
              >
                {uploading ? "Enviando..." : "Enviar Comprovante"}
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-card border border-border rounded-lg p-6 sticky top-20">
              <h3 className="text-lg font-bold text-foreground mb-6">Resumo do Pedido</h3>

              <div className="space-y-4 mb-6 pb-6 border-b border-border">
                {checkoutData.cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.name} x {item.quantity}
                    </span>
                    <span className="text-foreground font-medium">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Frete</span>
                  <span className="text-foreground">Grátis</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-bold text-foreground mb-4">
                <span>Total</span>
                <span className="text-accent">R$ {checkoutData.total.toFixed(2)}</span>
              </div>

              {/* Customer Info */}
              <div className="pt-6 border-t border-border">
                <h4 className="font-semibold text-foreground mb-3">Dados de Entrega</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>{checkoutData.formData.fullName} {checkoutData.formData.lastName}</p>
                  <p>{checkoutData.formData.street}, {checkoutData.formData.number}</p>
                  {checkoutData.formData.complement && <p>{checkoutData.formData.complement}</p>}
                  <p>{checkoutData.formData.city}, {checkoutData.formData.state}</p>
                  <p>{checkoutData.formData.zipCode}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
