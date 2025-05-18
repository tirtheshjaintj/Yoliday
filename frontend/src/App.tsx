/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import ProjectCard from "./components/ProjectCard";
import MobileNav from "./components/MobileNav.tsx";
import type { Project } from "./types";
import { getProjects, addToCart, getCart } from "./services/api";
import Modal from "react-modal";
import { ShoppingCart } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MOCK_USER = {
  name: "Lorem Ips",
  role: "Manager",
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

Modal.setAppElement("#root");

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<Project[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dbConnected, setDbConnected] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getProjects(pagination.page, pagination.limit);

        const transformedProjects = data.projects.map((project: any) => ({
          id: project.id.toString(),
          title: project.title,
          description: project.description,
          category: project.category,
          author: project.author,
          imageUrl: project.image_url,
        }));

        setProjects(transformedProjects);
        setPagination({
          ...pagination,
          total: data.pagination.total,
          totalPages: data.pagination.totalPages,
        });
        setDbConnected(true);
        toast.success("Projects loaded successfully.");
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to fetch projects.");
        setProjects([]);
        setDbConnected(false);
        toast.error("Failed to fetch projects.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [pagination.page, pagination.limit]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartItems = await getCart(1);

        const transformedCartItems = cartItems.map((item: any) => ({
          id: item.id.toString(),
          title: item.title,
          description: item.description,
          category: item.category,
          author: item.author,
          imageUrl: item.image_url,
        }));

        setCart(transformedCartItems);
      } catch (err) {
        console.error("Failed to fetch cart items:", err);
      }
    };

    if (dbConnected) {
      fetchCart();
    }
  }, [dbConnected]);

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = async (project: Project) => {
    try {
      if (cart.find((p) => p.id === project.id)) {
        toast.info("Project is already in cart.");
        return;
      }

      if (dbConnected) {
        await addToCart(project.id, 1);
      }

      setCart([...cart, project]);
      toast.success("Project added to cart!");
    } catch (err) {
      console.error("Failed to add to cart:", err);
      toast.error("Failed to add to cart.");
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="hidden md:block">
        <Sidebar
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />
      </div>

      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="relative">
          <Navbar user={MOCK_USER} onSearch={setSearchQuery} />
          <button
            onClick={() => setIsCartOpen(true)}
            className="absolute flex items-center justify-center p-2 text-white bg-blue-600 rounded-full right-4 top-4"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="ml-1 text-xs font-bold">{cart.length}</span>
          </button>
        </div>

        <main className="flex-1 p-4 overflow-y-auto md:p-6">
          <div className="mx-auto max-w-7xl">
            {loading ? (
              <div className="grid grid-cols-1 gap-4 md:gap-6">
                {[...Array(6)].map((_, index) => (
                  <div
                    key={index}
                    className="p-4 space-y-4 bg-white rounded shadow animate-pulse"
                  >
                    <div className="w-full h-48 bg-gray-300 rounded" />
                    <div className="w-3/4 h-4 bg-gray-300 rounded" />
                    <div className="w-1/2 h-4 bg-gray-200 rounded" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:gap-6">
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onAddToCart={handleAddToCart}
                    isMobile={window.innerWidth < 768}
                  />
                ))}
              </div>
            )}

            {dbConnected && pagination.totalPages > 1 && (
              <div className="flex justify-center mt-6">
                <button
                  className="px-4 py-2 mr-2 text-white bg-blue-500 rounded"
                  disabled={pagination.page === 1}
                  onClick={() =>
                    setPagination({ ...pagination, page: pagination.page - 1 })
                  }
                >
                  Previous
                </button>
                <span className="px-4 py-2">
                  Page {pagination.page} of {pagination.totalPages}
                </span>
                <button
                  className="px-4 py-2 ml-2 text-white bg-blue-500 rounded"
                  disabled={pagination.page === pagination.totalPages}
                  onClick={() =>
                    setPagination({ ...pagination, page: pagination.page + 1 })
                  }
                >
                  Next
                </button>
              </div>
            )}

            {!dbConnected && (
              <div className="p-2 mt-4 mb-4 text-sm text-center text-gray-500 bg-gray-100 rounded">
                SQL database not connected. Please configure database
                connection.
              </div>
            )}
          </div>
        </main>

        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>

      {/* Modal for Cart */}
      <Modal
        isOpen={isCartOpen}
        onRequestClose={() => setIsCartOpen(false)}
        contentLabel="Cart"
        className="max-w-xl p-4 mx-auto mt-24 bg-white rounded shadow-lg outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Your Cart</h2>
          <button
            className="text-gray-500 hover:text-red-600"
            onClick={() => setIsCartOpen(false)}
          >
            ✕
          </button>
        </div>
        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <ul className="space-y-4">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex items-center pb-2 space-x-4 border-b"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="object-cover w-16 h-16 rounded"
                />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.author}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Modal>
    </div>
  );
}

export default App;
