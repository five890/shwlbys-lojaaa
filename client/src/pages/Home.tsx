import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Search, User, Heart, CheckCircle } from "lucide-react";
import { getLoginUrl } from "@/const";
import { useState } from "react";
import { useLocation } from "wouter";
import ProductCarousel from "@/components/ProductCarousel";

export default function Home() {
  const { user, loading, isAuthenticated, logout } = useAuth();
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  // Mock products for demonstration
  const featuredProducts = [
    {
      id: 1,
      name: "Produto Premium 1",
      price: 299.90,
      promotionalPrice: 199.90,
      image: "https://via.placeholder.com/250x250?text=Produto+1",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Produto Premium 2",
      price: 399.90,
      promotionalPrice: 279.90,
      image: "https://via.placeholder.com/250x250?text=Produto+2",
      rating: 5,
    },
    {
      id: 3,
      name: "Produto Premium 3",
      price: 199.90,
      promotionalPrice: 149.90,
      image: "https://via.placeholder.com/250x250?text=Produto+3",
      rating: 4,
    },
    {
      id: 4,
      name: "Produto Premium 4",
      price: 499.90,
      promotionalPrice: 349.90,
      image: "https://via.placeholder.com/250x250?text=Produto+4",
      rating: 4.8,
    },
    {
      id: 5,
      name: "Produto Premium 5",
      price: 599.90,
      promotionalPrice: 449.90,
      image: "https://via.placeholder.com/250x250?text=Produto+5",
      rating: 4.7,
    },
    {
      id: 6,
      name: "Produto Premium 6",
      price: 349.90,
      promotionalPrice: 249.90,
      image: "https://via.placeholder.com/250x250?text=Produto+6",
      rating: 4.3,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-8 h-8 text-accent" />
              <div className="flex items-center gap-1">
                <h1 className="text-2xl font-bold text-foreground">Shelbys Store</h1>
                <CheckCircle className="w-6 h-6 text-accent fill-accent" />
              </div>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 mx-8 max-w-md">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <Search className="absolute right-3 top-2.5 w-5 h-5 text-muted-foreground" />
              </div>
            </div>

            {/* Right Navigation */}
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-muted rounded-lg transition">
                <Heart className="w-6 h-6 text-muted-foreground hover:text-accent" />
              </button>
              <button
                onClick={() => setLocation("/cart")}
                className="p-2 hover:bg-muted rounded-lg transition"
              >
                <ShoppingBag className="w-6 h-6 text-muted-foreground hover:text-accent" />
              </button>
              
              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setLocation("/my-orders")}
                    className="p-2 hover:bg-muted rounded-lg transition"
                  >
                    <User className="w-6 h-6 text-muted-foreground hover:text-accent" />
                  </button>
                  <button
                    onClick={logout}
                    className="px-4 py-2 text-sm font-medium bg-destructive text-destructive-foreground rounded-lg hover:opacity-90 transition"
                  >
                    Sair
                  </button>
                </div>
              ) : (
                <a href={getLoginUrl()}>
                  <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                    Entrar
                  </Button>
                </a>
              )}
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mt-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <Search className="absolute right-3 top-2.5 w-5 h-5 text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="bg-muted/20 border-t border-border">
          <div className="container mx-auto px-4">
            <div className="flex gap-6 py-3 overflow-x-auto">
              <a href="#" className="text-sm font-medium text-foreground hover:text-accent transition whitespace-nowrap">
                Todos os Produtos
              </a>
              <a href="#" className="text-sm font-medium text-foreground hover:text-accent transition whitespace-nowrap">
                Ofertas
              </a>
              <a href="#" className="text-sm font-medium text-foreground hover:text-accent transition whitespace-nowrap">
                Categorias
              </a>
              <a href="#" className="text-sm font-medium text-foreground hover:text-accent transition whitespace-nowrap">
                Sobre
              </a>
              <a href="#" className="text-sm font-medium text-foreground hover:text-accent transition whitespace-nowrap">
                Contato
              </a>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-accent/20 to-accent/10 py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Bem-vindo à Shelbys Store
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Descubra os melhores produtos com qualidade premium e preços incríveis. Compre com confiança e segurança.
            </p>
            <Button
              onClick={() => setLocation("/cart")}
              className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-6"
            >
              Explorar Produtos
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products Carousel */}
      <ProductCarousel products={featuredProducts} title="Produtos em Destaque" />

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <ShoppingBag className="w-6 h-6 text-accent" />
                <h4 className="font-bold text-foreground">Shelbys Store</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                A melhor loja virtual para encontrar produtos de qualidade com preços incríveis.
              </p>
            </div>

            {/* Links */}
            <div>
              <h5 className="font-semibold text-foreground mb-4">Navegação</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-accent transition">Sobre Nós</a></li>
                <li><a href="#" className="hover:text-accent transition">Contato</a></li>
                <li><a href="#" className="hover:text-accent transition">FAQ</a></li>
                <li><a href="#" className="hover:text-accent transition">Blog</a></li>
              </ul>
            </div>

            {/* Policies */}
            <div>
              <h5 className="font-semibold text-foreground mb-4">Políticas</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-accent transition">Privacidade</a></li>
                <li><a href="#" className="hover:text-accent transition">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-accent transition">Devoluções</a></li>
                <li><a href="#" className="hover:text-accent transition">Garantia</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h5 className="font-semibold text-foreground mb-4">Contato</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Email: contato@shelbysstore.com</li>
                <li>WhatsApp: (11) 99999-9999</li>
                <li>Telefone: (11) 3333-3333</li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2026 Shelbys Store. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
