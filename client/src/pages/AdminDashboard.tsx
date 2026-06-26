import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { LogOut, Package, ShoppingCart, Users, BarChart3, Plus, Edit2, Trash2, Eye, FileText, MapPin, CheckCircle, Clock, X, Upload, Image as ImageIcon } from "lucide-react";

interface Order {
  orderId: string;
  customer: string;
  email: string;
  amount: number;
  status: string;
  date: string;
  address: string;
  proofFile?: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  promotionalPrice: number;
  stock: number;
  category: string;
  images?: string[];
}

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [adminUser, setAdminUser] = useState<any>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Produto Premium 1", price: 299.90, promotionalPrice: 199.90, stock: 45, category: "Eletrônicos", images: ["https://via.placeholder.com/250x250?text=Produto+1"] },
    { id: 2, name: "Produto Premium 2", price: 399.90, promotionalPrice: 279.90, stock: 32, category: "Moda", images: ["https://via.placeholder.com/250x250?text=Produto+2"] },
    { id: 3, name: "Produto Premium 3", price: 199.90, promotionalPrice: 149.90, stock: 78, category: "Casa", images: ["https://via.placeholder.com/250x250?text=Produto+3"] },
    { id: 4, name: "Produto Premium 4", price: 499.90, promotionalPrice: 349.90, stock: 12, category: "Esportes", images: ["https://via.placeholder.com/250x250?text=Produto+4"] },
  ]);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    promotionalPrice: "",
    stock: "",
    category: "Eletrônicos",
    images: [] as string[],
  });
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState(["Eletrônicos", "Moda", "Casa", "Esportes"]);

  useEffect(() => {
    // Check if admin is logged in
    const adminSession = localStorage.getItem("adminSession");
    if (!adminSession) {
      setLocation("/admin/login");
      return;
    }
    setAdminUser(JSON.parse(adminSession));

    // Load orders from localStorage
    const lastOrder = localStorage.getItem("lastOrder");
    if (lastOrder) {
      const order = JSON.parse(lastOrder);
      setOrders([{
        orderId: order.orderId,
        customer: `${order.formData.fullName} ${order.formData.lastName}`,
        email: order.formData.email,
        amount: order.total,
        status: order.status,
        date: new Date(order.createdAt).toLocaleDateString("pt-BR"),
        address: `${order.formData.street}, ${order.formData.number}, ${order.formData.city} - ${order.formData.state}`,
        proofFile: order.proofFile,
      }]);
    }
  }, [setLocation]);

  const handleLogout = () => {
    localStorage.removeItem("adminSession");
    setLocation("/admin/login");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file && imagePreviews.length < 5) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        const newPreviews = [...imagePreviews];
        newPreviews[index] = result;
        setImagePreviews(newPreviews);
        
        const newImages = [...newProduct.images];
        newImages[index] = result;
        setNewProduct({ ...newProduct, images: newImages });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (index: number) => {
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(newPreviews);
    
    const newImages = newProduct.images.filter((_, i) => i !== index);
    setNewProduct({ ...newProduct, images: newImages });
  };

  const handleApproveOrder = (orderId: string) => {
    setOrders(orders.map(o => o.orderId === orderId ? { ...o, status: "Sendo Preparado" } : o));
    alert("Pedido aprovado! Status atualizado para 'Sendo Preparado'");
  };

  const handleRejectOrder = (orderId: string) => {
    setOrders(orders.map(o => o.orderId === orderId ? { ...o, status: "Recusado" } : o));
    alert("Pedido recusado!");
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map(o => o.orderId === orderId ? { ...o, status: newStatus } : o));
    alert(`Status atualizado para '${newStatus}'`);
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.promotionalPrice || !newProduct.stock) {
      alert("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    if (newProduct.images.length === 0) {
      alert("Por favor, adicione pelo menos uma imagem");
      return;
    }

    const product: Product = {
      id: Math.max(...products.map(p => p.id), 0) + 1,
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      promotionalPrice: parseFloat(newProduct.promotionalPrice),
      stock: parseInt(newProduct.stock),
      category: newProduct.category,
      images: newProduct.images.length > 0 ? newProduct.images : ["https://via.placeholder.com/250x250?text=Sem+Imagem"],
    };

    setProducts([...products, product]);
    setNewProduct({ name: "", price: "", promotionalPrice: "", stock: "", category: "Eletrônicos", images: [] });
    setImagePreviews([]);
    setShowAddProductModal(false);
    alert("Produto adicionado com sucesso!");
  };

  const handleDeleteProduct = (id: number) => {
    if (confirm("Tem certeza que deseja deletar este produto?")) {
      setProducts(products.filter(p => p.id !== id));
      alert("Produto deletado com sucesso!");
    }
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setCategories([...categories, newCategory]);
      setNewCategory("");
      alert("Categoria adicionada com sucesso!");
    }
  };

  const handleDeleteCategory = (cat: string) => {
    if (confirm("Tem certeza que deseja deletar esta categoria?")) {
      setCategories(categories.filter(c => c !== cat));
      alert("Categoria deletada com sucesso!");
    }
  };

  // Mock data
  const stats = [
    { label: "Produtos", value: products.length.toString(), icon: Package, color: "bg-green-500" },
    { label: "Pedidos Hoje", value: orders.length.toString(), icon: BarChart3, color: "bg-orange-500" },
  ];

  if (!adminUser) return null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Painel Admin</h1>
            <p className="text-sm text-muted-foreground">Bem-vindo, {adminUser.username}</p>
          </div>
          <Button
            onClick={handleLogout}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border pb-4 overflow-x-auto">
          {[
            { id: "dashboard", label: "Dashboard" },
            { id: "orders", label: "Pedidos & Comprovantes" },
            { id: "products", label: "Produtos" },
            { id: "categories", label: "Categorias" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 font-medium transition whitespace-nowrap ${
                activeTab === tab.id
                  ? "text-accent border-b-2 border-accent"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="bg-card border border-border rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      </div>
                      <div className={`${stat.color} p-3 rounded-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Chart Placeholder */}
            <div className="bg-card border border-border rounded-lg p-6 mb-8">
              <h3 className="text-lg font-bold text-foreground mb-4">Vendas por Período</h3>
              <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Gráfico de vendas (integração em desenvolvimento)</p>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Pedidos Recentes</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-muted-foreground font-medium">Pedido</th>
                      <th className="text-left py-3 px-4 text-muted-foreground font-medium">Cliente</th>
                      <th className="text-left py-3 px-4 text-muted-foreground font-medium">Valor</th>
                      <th className="text-left py-3 px-4 text-muted-foreground font-medium">Status</th>
                      <th className="text-left py-3 px-4 text-muted-foreground font-medium">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 5).map((order) => (
                      <tr key={order.orderId} className="border-b border-border hover:bg-muted/20 transition">
                        <td className="py-3 px-4 text-foreground font-medium">{order.orderId}</td>
                        <td className="py-3 px-4 text-foreground">{order.customer}</td>
                        <td className="py-3 px-4 text-foreground font-semibold">R$ {order.amount.toFixed(2)}</td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            order.status === "Entregue" ? "bg-green-500/20 text-green-400" :
                            order.status === "Em Processamento" ? "bg-blue-500/20 text-blue-400" :
                            order.status === "Enviado" ? "bg-purple-500/20 text-purple-400" :
                            order.status === "Cancelado" ? "bg-red-500/20 text-red-400" :
                            "bg-orange-500/20 text-orange-400"
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="text-accent hover:text-accent/80 transition"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Orders & Proofs Tab */}
        {activeTab === "orders" && (
          <div>
            {selectedOrder ? (
              <div className="bg-card border border-border rounded-lg p-8">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-accent hover:text-accent/80 mb-6 flex items-center gap-2"
                >
                  ← Voltar
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Order Details */}
                  <div className="lg:col-span-2">
                    <h2 className="text-2xl font-bold text-foreground mb-6">{selectedOrder.orderId}</h2>

                    {/* Customer Info */}
                    <div className="mb-6 p-4 bg-muted/20 rounded-lg">
                      <h3 className="font-semibold text-foreground mb-3">Dados do Cliente</h3>
                      <p className="text-foreground mb-1"><strong>Nome:</strong> {selectedOrder.customer}</p>
                      <p className="text-foreground mb-1"><strong>Email:</strong> {selectedOrder.email}</p>
                      <p className="text-foreground"><strong>Endereço:</strong> {selectedOrder.address}</p>
                    </div>

                    {/* Proof File */}
                    {selectedOrder.proofFile && (
                      <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <FileText className="w-5 h-5 text-blue-400" />
                          Comprovante de Pagamento
                        </h3>
                        <p className="text-muted-foreground mb-3">Arquivo: {selectedOrder.proofFile}</p>
                        <div className="flex gap-2">
                          <Button className="bg-blue-600 text-white hover:bg-blue-700">
                            Visualizar Comprovante
                          </Button>
                          {selectedOrder.status === "Aguardando Validação" && (
                            <>
                              <Button
                                onClick={() => handleApproveOrder(selectedOrder.orderId)}
                                className="bg-green-600 text-white hover:bg-green-700 flex items-center gap-2"
                              >
                                <CheckCircle className="w-4 h-4" />
                                Aprovar
                              </Button>
                              <Button
                                onClick={() => handleRejectOrder(selectedOrder.orderId)}
                                className="bg-red-600 text-white hover:bg-red-700"
                              >
                                Rejeitar
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Status Update */}
                    <div className="p-4 bg-muted/20 rounded-lg">
                      <h3 className="font-semibold text-foreground mb-3">Atualizar Status</h3>
                      <select 
                        value={selectedOrder.status}
                        onChange={(e) => handleUpdateOrderStatus(selectedOrder.orderId, e.target.value)}
                        className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      >
                        <option value="Aguardando Validação">Aguardando Validação</option>
                        <option value="Pendente">Pendente</option>
                        <option value="Sendo Preparado">Sendo Preparado</option>
                        <option value="Enviado">Enviado</option>
                        <option value="Entregue">Entregue</option>
                        <option value="Recusado">Recusado</option>
                      </select>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="bg-muted/20 rounded-lg p-4">
                    <h3 className="font-semibold text-foreground mb-4">Resumo</h3>
                    <div className="space-y-2 mb-4 pb-4 border-b border-border">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Total</span>
                        <span className="text-foreground font-bold">R$ {selectedOrder.amount.toFixed(2)}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Status Atual</p>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        selectedOrder.status === "Entregue" ? "bg-green-500/20 text-green-400" :
                        selectedOrder.status === "Em Processamento" ? "bg-blue-500/20 text-blue-400" :
                        selectedOrder.status === "Enviado" ? "bg-purple-500/20 text-purple-400" :
                        selectedOrder.status === "Cancelado" ? "bg-red-500/20 text-red-400" :
                        "bg-orange-500/20 text-orange-400"
                      }`}>
                        {selectedOrder.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/20">
                      <th className="text-left py-3 px-4 text-muted-foreground font-medium">Pedido</th>
                      <th className="text-left py-3 px-4 text-muted-foreground font-medium">Cliente</th>
                      <th className="text-left py-3 px-4 text-muted-foreground font-medium">Endereço Entrega</th>
                      <th className="text-left py-3 px-4 text-muted-foreground font-medium">Valor</th>
                      <th className="text-left py-3 px-4 text-muted-foreground font-medium">Status</th>
                      <th className="text-left py-3 px-4 text-muted-foreground font-medium">Comprovante</th>
                      <th className="text-left py-3 px-4 text-muted-foreground font-medium">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.orderId} className="border-b border-border hover:bg-muted/20 transition">
                        <td className="py-3 px-4 text-foreground font-medium">{order.orderId}</td>
                        <td className="py-3 px-4 text-foreground text-sm">{order.customer}</td>
                        <td className="py-3 px-4 text-muted-foreground text-xs">{order.address}</td>
                        <td className="py-3 px-4 text-foreground font-semibold">R$ {order.amount.toFixed(2)}</td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            order.status === "Entregue" ? "bg-green-500/20 text-green-400" :
                            order.status === "Em Processamento" ? "bg-blue-500/20 text-blue-400" :
                            order.status === "Enviado" ? "bg-purple-500/20 text-purple-400" :
                            order.status === "Cancelado" ? "bg-red-500/20 text-red-400" :
                            "bg-orange-500/20 text-orange-400"
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          {order.proofFile ? (
                            <span className="text-xs text-green-400 flex items-center gap-1">
                              <CheckCircle className="w-4 h-4" />
                              {order.proofFile}
                            </span>
                          ) : (
                            <span className="text-xs text-muted-foreground">-</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="text-accent hover:text-accent/80 transition"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Products Tab */}
        {activeTab === "products" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-foreground">Gerenciar Produtos ({products.length})</h3>
              <Button
                onClick={() => setShowAddProductModal(true)}
                className="bg-accent text-accent-foreground hover:bg-accent/90 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Novo Produto
              </Button>
            </div>

            {/* Add Product Modal */}
            {showAddProductModal && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-card border border-border rounded-lg p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-foreground">Adicionar Novo Produto</h3>
                    <button
                      onClick={() => {
                        setShowAddProductModal(false);
                        setImagePreviews([]);
                      }}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Form */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Nome do Produto *</label>
                        <input
                          type="text"
                          value={newProduct.name}
                          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                          placeholder="Ex: Produto Premium"
                          className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Preço Original *</label>
                        <input
                          type="number"
                          step="0.01"
                          value={newProduct.price}
                          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                          placeholder="299.90"
                          className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Preço Promocional *</label>
                        <input
                          type="number"
                          step="0.01"
                          value={newProduct.promotionalPrice}
                          onChange={(e) => setNewProduct({ ...newProduct, promotionalPrice: e.target.value })}
                          placeholder="199.90"
                          className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Estoque *</label>
                        <input
                          type="number"
                          value={newProduct.stock}
                          onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                          placeholder="45"
                          className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Categoria *</label>
                        <select
                          value={newProduct.category}
                          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                          className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                        >
                          {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Right Column - Image Upload (5 slots) */}
                    <div className="lg:col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Imagens do Produto ({imagePreviews.length}/5)
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {[0, 1, 2, 3, 4].map((index) => (
                          <div key={index} className="relative">
                            {imagePreviews[index] ? (
                              <div className="relative group">
                                <img
                                  src={imagePreviews[index]}
                                  alt={`Preview ${index + 1}`}
                                  className="w-full h-32 object-cover rounded-lg border border-border"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition rounded-lg flex items-center justify-center gap-2">
                                  <label className="cursor-pointer p-2 bg-accent rounded hover:bg-accent/90 transition">
                                    <input
                                      type="file"
                                      accept="image/*"
                                      onChange={(e) => handleImageUpload(e, index)}
                                      className="hidden"
                                    />
                                    <Upload className="w-4 h-4 text-white" />
                                  </label>
                                  <button
                                    onClick={() => handleRemoveImage(index)}
                                    className="p-2 bg-destructive rounded hover:bg-destructive/90 transition"
                                  >
                                    <X className="w-4 h-4 text-white" />
                                  </button>
                                </div>
                                <span className="absolute top-1 right-1 bg-accent text-white text-xs px-2 py-1 rounded">
                                  {index + 1}
                                </span>
                              </div>
                            ) : (
                              <label className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-accent transition cursor-pointer h-32 flex flex-col items-center justify-center">
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => handleImageUpload(e, index)}
                                  className="hidden"
                                />
                                <Upload className="w-6 h-6 text-muted-foreground mb-2" />
                                <span className="text-xs text-muted-foreground">Imagem {index + 1}</span>
                              </label>
                            )}
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-3">
                        Você pode adicionar até 5 imagens. Clique ou arraste para fazer upload.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-6 mt-6 border-t border-border">
                    <Button
                      onClick={() => {
                        setShowAddProductModal(false);
                        setImagePreviews([]);
                      }}
                      className="flex-1 bg-muted text-foreground hover:bg-muted/80"
                    >
                      Cancelar
                    </Button>
                    <Button
                      onClick={handleAddProduct}
                      className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
                    >
                      Adicionar Produto
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Products Table */}
            <div className="bg-card border border-border rounded-lg overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/20">
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Imagens</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Nome</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Preço</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Preço Promo</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Estoque</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Categoria</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b border-border hover:bg-muted/20 transition">
                      <td className="py-3 px-4">
                        <div className="flex gap-1">
                          {product.images && product.images.slice(0, 3).map((img, i) => (
                            <img
                              key={i}
                              src={img}
                              alt={`${product.name} ${i + 1}`}
                              className="w-10 h-10 object-cover rounded-lg border border-border"
                              title={`Imagem ${i + 1}`}
                            />
                          ))}
                          {product.images && product.images.length > 3 && (
                            <div className="w-10 h-10 rounded-lg border border-border bg-muted/20 flex items-center justify-center text-xs font-bold text-muted-foreground">
                              +{product.images.length - 3}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-foreground font-medium">{product.name}</td>
                      <td className="py-3 px-4 text-foreground">R$ {product.price.toFixed(2)}</td>
                      <td className="py-3 px-4 text-accent font-semibold">R$ {product.promotionalPrice.toFixed(2)}</td>
                      <td className="py-3 px-4 text-foreground">{product.stock} un</td>
                      <td className="py-3 px-4 text-muted-foreground">{product.category}</td>
                      <td className="py-3 px-4 flex gap-2">
                        <button className="p-1 hover:bg-muted rounded transition text-accent">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-1 hover:bg-muted rounded transition text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Categories Tab */}
        {activeTab === "categories" && (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Add Category */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Adicionar Categoria</h3>
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Nome da categoria"
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent mb-4"
                />
                <Button
                  onClick={handleAddCategory}
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  Adicionar
                </Button>
              </div>

              {/* Categories List */}
              <div className="lg:col-span-2 bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Categorias Existentes ({categories.length})</h3>
                <div className="space-y-2">
                  {categories.map((cat, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                      <span className="text-foreground">{cat}</span>
                      <button
                        onClick={() => handleDeleteCategory(cat)}
                        className="p-1 hover:bg-destructive/20 rounded transition text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
