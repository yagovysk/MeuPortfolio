export const devLabTabs = [
  "playground",
  "components",
  "patterns",
  "tests",
  "accessibility",
  "architecture",
  "snippets",
];

export const componentShowcaseData = [
  {
    id: "futuristic-button",
    technologies: ["React", "CSS", "A11y"],
    code: `<button className="tg-btn" type="button">\n  Solicitar Orcamento\n</button>\n\n/* foco visivel e area de clique confortavel */\n.tg-btn {\n  min-height: 44px;\n  padding: 0.75rem 1.25rem;\n  border-radius: 12px;\n  border: 2px solid transparent;\n  background: linear-gradient(135deg, #00d4ff, #00ffb3);\n  color: #051a29;\n  font-weight: 700;\n}\n.tg-btn:hover {\n  transform: translateY(-1px);\n}\n.tg-btn:focus-visible {\n  outline: 3px solid #1d4ed8;\n  outline-offset: 3px;\n}`,
  },
  {
    id: "project-card",
    technologies: ["React", "Semantic HTML", "SEO"],
    code: `<article className="project-card">\n  <h3>Togyro Delivery IA</h3>\n  <p>Problema, solucao e resultado esperado em mobile.</p>\n  <a href="/case-study/togyro-delivery">Ver estudo de caso</a>\n</article>`,
  },
  {
    id: "pricing-card",
    technologies: ["React", "Design System"],
    code: `const PricingCard = ({ plan, price, features }) => (\n  <article aria-label={plan}>\n    <h3>{plan}</h3>\n    <p>R$ {price}/mes</p>\n    <ul>{features.map((feature) => <li key={feature}>{feature}</li>)}</ul>\n    <button type="button">Escolher plano</button>\n  </article>\n);`,
  },
  {
    id: "whatsapp-cta",
    technologies: ["JavaScript", "URL API"],
    code: `export const createWhatsAppLink = ({ phone, message }) => {\n  const digits = String(phone).replace(/\\D/g, "");\n  const text = encodeURIComponent(message.trim());\n  return \`https://wa.me/\${digits}?text=\${text}\`;\n};`,
  },
  {
    id: "tech-badge",
    technologies: ["React", "CSS Variables"],
    code: `<span className="tech-badge" aria-label="React">React</span>\n\n.tech-badge {\n  padding: 0.35rem 0.7rem;\n  border-radius: 999px;\n  border: 1px solid rgba(0, 212, 255, 0.5);\n  background: rgba(0, 212, 255, 0.12);\n}`,
  },
  {
    id: "accessible-modal",
    technologies: ["React", "ARIA", "Keyboard"],
    code: `<section role="dialog" aria-modal="true" aria-labelledby="modal-title">\n  <h2 id="modal-title">Confirmar acao</h2>\n  <p>O foco inicial vai para o botao de fechar.</p>\n  <button type="button" aria-label="Fechar modal">Fechar</button>\n</section>`,
  },
  {
    id: "toast-notification",
    technologies: ["React", "aria-live"],
    code: `<div role="status" aria-live="polite">\n  Codigo copiado com sucesso.\n</div>`,
  },
  {
    id: "input-accessible-error",
    technologies: ["React", "Form", "WCAG"],
    code: `<label htmlFor="email">E-mail</label>\n<input\n  id="email"\n  aria-invalid="true"\n  aria-describedby="email-error"\n/>\n<p id="email-error">Informe um e-mail valido.</p>`,
  },
];

export const designPatternsData = [
  {
    id: "strategy",
    code: `interface DiscountStrategy {\n  calculate(total: number): number;\n}\n\nclass PixDiscount implements DiscountStrategy {\n  calculate(total: number) {\n    return total * 0.9;\n  }\n}\n\nclass CheckoutContext {\n  constructor(private strategy: DiscountStrategy) {}\n\n  getTotal(total: number) {\n    return this.strategy.calculate(total);\n  }\n}`,
  },
  {
    id: "factory",
    code: `type Agent = { run(input: string): string };\n\nclass SalesAgent implements Agent {\n  run(input: string) {\n    return \`[sales] \${input}\`;\n  }\n}\n\nclass SupportAgent implements Agent {\n  run(input: string) {\n    return \`[support] \${input}\`;\n  }\n}\n\nfunction createAgent(type: "sales" | "support"): Agent {\n  return type === "sales" ? new SalesAgent() : new SupportAgent();\n}`,
  },
  {
    id: "adapter",
    code: `interface DeliveryGateway {\n  createOrder(total: number): Promise<string>;\n}\n\nclass ExternalProviderApi {\n  async send(payload: { amountInCents: number }) {\n    return { id: "ext-123" };\n  }\n}\n\nclass ProviderAdapter implements DeliveryGateway {\n  constructor(private api: ExternalProviderApi) {}\n\n  async createOrder(total: number) {\n    const response = await this.api.send({ amountInCents: total * 100 });\n    return response.id;\n  }\n}`,
  },
  {
    id: "observer",
    code: `type Listener = (cartTotal: number) => void;\n\nclass CartStore {\n  private listeners: Listener[] = [];\n  private total = 0;\n\n  subscribe(listener: Listener) {\n    this.listeners.push(listener);\n  }\n\n  updateTotal(total: number) {\n    this.total = total;\n    this.listeners.forEach((listener) => listener(this.total));\n  }\n}`,
  },
  {
    id: "repository",
    code: `interface ProductRepository {\n  findByTenant(tenantId: string): Promise<Product[]>;\n}\n\nclass PrismaProductRepository implements ProductRepository {\n  async findByTenant(tenantId: string) {\n    return prisma.product.findMany({ where: { tenantId } });\n  }\n}`,
  },
  {
    id: "command",
    code: `interface Command {\n  execute(): Promise<void>;\n}\n\nclass CreateOrderCommand implements Command {\n  constructor(private readonly service: OrderService) {}\n\n  async execute() {\n    await this.service.create();\n  }\n}\n\nclass CommandBus {\n  async run(command: Command) {\n    await command.execute();\n  }\n}`,
  },
];

export const testScenariosData = [
  {
    id: "react-component",
    category: "front-end",
    code: `import { render, screen } from "@testing-library/react";\nimport { CTAButton } from "./CTAButton";\n\ntest("renderiza CTA com nome acessivel", () => {\n  render(<CTAButton label="Solicitar orcamento" />);\n  expect(screen.getByRole("button", { name: /solicitar orcamento/i })).toBeInTheDocument();\n});`,
  },
  {
    id: "accessible-form",
    category: "front-end",
    code: `test("mostra erro com aria-describedby", async () => {\n  render(<ContactForm />);\n  await user.click(screen.getByRole("button", { name: /enviar/i }));\n  const emailInput = screen.getByLabelText(/e-mail/i);\n  expect(emailInput).toHaveAttribute("aria-invalid", "true");\n  expect(emailInput).toHaveAttribute("aria-describedby", "email-error");\n});`,
  },
  {
    id: "api-create-product",
    category: "back-end",
    code: `it("cria produto com tenant correto", async () => {\n  const response = await request(app)\n    .post("/products")\n    .set("x-tenant-id", "tenant-a")\n    .send({ name: "Pizza", price: 49.9 });\n\n  expect(response.status).toBe(201);\n  expect(response.body.tenantId).toBe("tenant-a");\n});`,
  },
  {
    id: "tenant-isolation",
    category: "seguranca",
    code: `it("impede acesso entre tenants", async () => {\n  const product = await seedProduct({ tenantId: "tenant-a" });\n\n  const response = await request(app)\n    .get(\`/products/\${product.id}\`)\n    .set("x-tenant-id", "tenant-b");\n\n  expect(response.status).toBe(404);\n});`,
  },
  {
    id: "currency-format",
    category: "regra",
    code: `test("formata BRL corretamente", () => {\n  expect(formatCurrency(1999.9)).toBe("R$\u00a01.999,90");\n});`,
  },
  {
    id: "cart-rule",
    category: "regra",
    code: `test("aplica frete gratis acima de 120", () => {\n  const result = calculateCartTotal({ subtotal: 140, shipping: 15 });\n  expect(result.shipping).toBe(0);\n});`,
  },
];

export const snippetsData = [
  {
    id: "format-currency",
    code: `export const formatCurrency = (value) =>\n  new Intl.NumberFormat("pt-BR", {\n    style: "currency",\n    currency: "BRL",\n  }).format(Number(value || 0));`,
  },
  {
    id: "create-whatsapp-link",
    code: `export const createWhatsAppLink = (phone, message) => {\n  const normalized = String(phone).replace(/\\D/g, "");\n  return \`https://wa.me/\${normalized}?text=\${encodeURIComponent(message)}\`;\n};`,
  },
  {
    id: "use-local-storage",
    code: `import { useEffect, useState } from "react";\n\nexport const useLocalStorage = (key, initial) => {\n  const [state, setState] = useState(() => {\n    const cached = localStorage.getItem(key);\n    return cached ? JSON.parse(cached) : initial;\n  });\n\n  useEffect(() => {\n    localStorage.setItem(key, JSON.stringify(state));\n  }, [key, state]);\n\n  return [state, setState];\n};`,
  },
  {
    id: "zod-validation",
    code: `import { z } from "zod";\n\nexport const schema = z.object({\n  name: z.string().min(2),\n  email: z.string().email(),\n});`,
  },
  {
    id: "debounce",
    code: `export const debounce = (fn, delay = 300) => {\n  let timer;\n  return (...args) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), delay);\n  };\n};`,
  },
  {
    id: "slugify",
    code: `export const slugify = (value) =>\n  String(value)\n    .normalize("NFD")\n    .replace(/[\\u0300-\\u036f]/g, "")\n    .toLowerCase()\n    .trim()\n    .replace(/[^a-z0-9\\s-]/g, "")\n    .replace(/\\s+/g, "-");`,
  },
  {
    id: "class-helper",
    code: `export const cx = (...classes) => classes.filter(Boolean).join(" ");`,
  },
  {
    id: "api-error-handler",
    code: `export const handleApiError = (error) => {\n  if (error?.response?.data?.message) return error.response.data.message;\n  return "Erro inesperado. Tente novamente.";\n};`,
  },
];

export const accessibilityLabData = [
  "focus-visible",
  "heading-structure",
  "modal-accessible",
  "aria-describedby",
  "button-accessible-name",
  "color-contrast",
  "keyboard-navigation",
  "image-alt",
  "reduced-motion",
];

export const architectureData = [
  "landing-ai-agent",
  "saas-multitenant",
  "delivery-ai",
  "ecommerce-admin",
  "web-game-reward-ads",
  "portfolio-virtual-agent",
];

export const playgroundData = [
  "whatsapp-generator",
  "cta-generator",
  "product-card-preview",
  "discount-simulator",
  "layout-choice",
  "agent-message",
];
