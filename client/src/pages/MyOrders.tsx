import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Package, Eye, ArrowLeft, CheckCircle, Clock, Truck, MapPin } from "lucide-react";

interface Order {
  orderId: string;
  status: string;
  total: number;
  createdAt: string;
  estimatedDelivery: string;
  items: any[];
  formData: any;
}

export default function MyOrders() {
  const [, setLocation] = useLocation();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    // Load orders from localStorage
    const lastOrder = localStorage.getItem("lastOrder");
    if (lastOrder) {
      const order = JSON.parse(lastOrder);
      setOrders([order]);
    }
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Aguardando Validação":
        return <Clock className="w-5 h-5 text-orange-400" />;
      case "Aguardando Pagamento":
        return <Clock className="w-5 h-5 text-orange-400" />;
      case "Em Processamento":
        return <Package className="w-5 h-5 text-blue-400" />;
      case "Enviado":
        return <Truck className="w-5 h-5 text-purple-400" />;
      case "Entregue":
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case "Cancelado":
        return <Clock className="w-5 h-5 text-red-400" />;
      default:
        return <Package className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aguardando Validação":
        return "bg-orange-500/20 text-orange-400";
      case "Aguardando Pagamento":
        return "bg-orange-500/20 text-orange-400";
      case "Em Processamento":
        return "bg-blue-500/20 text-blue-400";
      case "Enviado":
        return "bg-purple-500/20 text-purple-400";
      case "Entregue":
        return "bg-green-500/20 text-green-400";
      case "Cancelado":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  if (selectedOrder) {
    return (
      <div className="min-h-screen bg-background text-foreground py-12">
        <div className="container mx-auto px-4">
          <button
            onClick={() => setSelectedOrder(null)}
            className="flex items-center gap-2 text-accent hover:text-accent/80 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para meus pedidos
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Details */}
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-lg p-8 mb-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                      Pedido {selectedOrder.orderId}
                    </h1>
                    <p className="text-muted-foreground">
                      Realizado em {new Date(selectedOrder.createdAt).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${getStatusColor(selectedOrder.status)}`}>
                    {getStatusIcon(selectedOrder.status)}
                    <span className="font-medium">{selectedOrder.status}</span>
                  </div>
                </div>

                {/* Timeline */}
                <div className="mb-8 pb-8 border-b border-border">
                  <h3 className="font-semibold text-foreground mb-4">Status do Pedido</h3>
                  <div className="space-y-4">
                    {[
                      { label: "Pedido Recebido", date: selectedOrder.createdAt, completed: true },
                      { label: "Pagamento Validado", date: null, completed: selectedOrder.status !== "Aguardando Validação" },
                      { label: "Em Processamento", date: null, completed: ["Em Processamento", "Enviado", "Entregue"].includes(selectedOrder.status) },
                      { label: "Enviado", date: null, completed: ["Enviado", "Entregue"].includes(selectedOrder.status) },
                      { label: "Entregue", date: null, completed: selectedOrder.status === "Entregue" },
                    ].map((step, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            step.completed ? "bg-green-500 border-green-500" : "border-muted"
                          }`}>
                            {step.completed && <CheckCircle className="w-4 h-4 text-white" />}
                          </div>
                          {i < 4 && <div className="w-0.5 h-12 bg-muted mt-2" />}
                        </div>
                        <div>
                          <p className={`font-medium ${step.completed ? "text-foreground" : "text-muted-foreground"}`}>
                            {step.label}
                          </p>
                          {step.date && (
                            <p className="text-sm text-muted-foreground">
                              {new Date(step.date).toLocaleDateString("pt-BR")}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Items */}
                <div className="mb-8 pb-8 border-b border-border">
                  <h3 className="font-semibold text-foreground mb-4">Itens do Pedido</h3>
                  <div className="space-y-4">
                    {selectedOrder.items.map((item) => (
                      <div key={item.id} className="flex gap-4 p-4 bg-muted/20 rounded-lg">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{item.name}</p>
                          <p className="text-sm text-muted-foreground">Quantidade: {item.quantity}</p>
                          <p className="text-accent font-semibold">R$ {(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery Info */}
                <div>
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-accent" />
                    Endereço de Entrega
                  </h3>
                  <div className="p-4 bg-muted/20 rounded-lg">
                    <p className="font-medium text-foreground mb-2">
                      {selectedOrder.formData.fullName} {selectedOrder.formData.lastName}
                    </p>
                    <p className="text-muted-foreground">
                      {selectedOrder.formData.street}, {selectedOrder.formData.number}
                    </p>
                    {selectedOrder.formData.complement && (
                      <p className="text-muted-foreground">{selectedOrder.formData.complement}</p>
                    )}
                    <p className="text-muted-foreground">
                      {selectedOrder.formData.city}, {selectedOrder.formData.state} - {selectedOrder.formData.zipCode}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div>
              <div className="bg-card border border-border rounded-lg p-6 sticky top-20">
                <h3 className="text-lg font-bold text-foreground mb-6">Resumo</h3>

                <div className="space-y-4 mb-6 pb-6 border-b border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">R$ {(selectedOrder.total - 15).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Frete</span>
                    <span className="text-foreground">Grátis</span>
                  </div>
                </div>

                <div className="flex justify-between text-lg font-bold text-foreground mb-6">
                  <span>Total</span>
                  <span className="text-accent">R$ {selectedOrder.total.toFixed(2)}</span>
                </div>

                <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <p className="text-sm text-blue-400">
                    <strong>Previsão de Entrega:</strong> {selectedOrder.estimatedDelivery}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground py-12">
      <div className="container mx-auto px-4">
        <button
          onClick={() => setLocation("/")}
          className="flex items-center gap-2 text-accent hover:text-accent/80 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para a loja
        </button>

        <h1 className="text-3xl font-bold text-foreground mb-8">Meus Pedidos</h1>

        {orders.length === 0 ? (
          <div className="bg-card border border-border rounded-lg p-12 text-center">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h2 className="text-xl font-semibold text-foreground mb-2">Nenhum pedido encontrado</h2>
            <p className="text-muted-foreground mb-6">Você ainda não realizou nenhuma compra</p>
            <Button
              onClick={() => setLocation("/")}
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Começar a Comprar
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.orderId}
                className="bg-card border border-border rounded-lg p-6 hover:border-accent transition cursor-pointer"
                onClick={() => setSelectedOrder(order)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-foreground">{order.orderId}</h3>
                      <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Realizado em {new Date(order.createdAt).toLocaleDateString("pt-BR")}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Previsão de entrega: {order.estimatedDelivery}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-accent mb-2">R$ {order.total.toFixed(2)}</p>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedOrder(order);
                      }}
                      className="bg-accent text-accent-foreground hover:bg-accent/90 flex items-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      Ver Detalhes
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
