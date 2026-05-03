import{j as e}from"./animation-vendor-R7XxqMv1.js";import{r as l}from"./react-vendor-H14vcryl.js";import{a as g}from"./components-WVAm0OgP.js";import"./swiper-vendor-UY8cThZs.js";import"./icons-vendor-UOkZEPfX.js";const v=["playground","components","patterns","tests","accessibility","architecture","snippets"],x=[{id:"futuristic-button",technologies:["React","CSS","A11y"],code:`<button className="tg-btn" type="button">
  Solicitar Orcamento
</button>

/* foco visivel e area de clique confortavel */
.tg-btn {
  min-height: 44px;
  padding: 0.75rem 1.25rem;
  border-radius: 12px;
  border: 2px solid transparent;
  background: linear-gradient(135deg, #00d4ff, #00ffb3);
  color: #051a29;
  font-weight: 700;
}
.tg-btn:hover {
  transform: translateY(-1px);
}
.tg-btn:focus-visible {
  outline: 3px solid #1d4ed8;
  outline-offset: 3px;
}`},{id:"project-card",technologies:["React","Semantic HTML","SEO"],code:`<article className="project-card">
  <h3>Togyro Delivery IA</h3>
  <p>Problema, solucao e resultado esperado em mobile.</p>
  <a href="/case-study/togyro-delivery">Ver estudo de caso</a>
</article>`},{id:"pricing-card",technologies:["React","Design System"],code:`const PricingCard = ({ plan, price, features }) => (
  <article aria-label={plan}>
    <h3>{plan}</h3>
    <p>R$ {price}/mes</p>
    <ul>{features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
    <button type="button">Escolher plano</button>
  </article>
);`},{id:"whatsapp-cta",technologies:["JavaScript","URL API"],code:'export const createWhatsAppLink = ({ phone, message }) => {\n  const digits = String(phone).replace(/\\D/g, "");\n  const text = encodeURIComponent(message.trim());\n  return `https://wa.me/${digits}?text=${text}`;\n};'},{id:"tech-badge",technologies:["React","CSS Variables"],code:`<span className="tech-badge" aria-label="React">React</span>

.tech-badge {
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  border: 1px solid rgba(0, 212, 255, 0.5);
  background: rgba(0, 212, 255, 0.12);
}`},{id:"accessible-modal",technologies:["React","ARIA","Keyboard"],code:`<section role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <h2 id="modal-title">Confirmar acao</h2>
  <p>O foco inicial vai para o botao de fechar.</p>
  <button type="button" aria-label="Fechar modal">Fechar</button>
</section>`},{id:"toast-notification",technologies:["React","aria-live"],code:`<div role="status" aria-live="polite">
  Codigo copiado com sucesso.
</div>`},{id:"input-accessible-error",technologies:["React","Form","WCAG"],code:`<label htmlFor="email">E-mail</label>
<input
  id="email"
  aria-invalid="true"
  aria-describedby="email-error"
/>
<p id="email-error">Informe um e-mail valido.</p>`}],y=[{id:"strategy",code:`interface DiscountStrategy {
  calculate(total: number): number;
}

class PixDiscount implements DiscountStrategy {
  calculate(total: number) {
    return total * 0.9;
  }
}

class CheckoutContext {
  constructor(private strategy: DiscountStrategy) {}

  getTotal(total: number) {
    return this.strategy.calculate(total);
  }
}`},{id:"factory",code:`type Agent = { run(input: string): string };

class SalesAgent implements Agent {
  run(input: string) {
    return \`[sales] \${input}\`;
  }
}

class SupportAgent implements Agent {
  run(input: string) {
    return \`[support] \${input}\`;
  }
}

function createAgent(type: "sales" | "support"): Agent {
  return type === "sales" ? new SalesAgent() : new SupportAgent();
}`},{id:"adapter",code:`interface DeliveryGateway {
  createOrder(total: number): Promise<string>;
}

class ExternalProviderApi {
  async send(payload: { amountInCents: number }) {
    return { id: "ext-123" };
  }
}

class ProviderAdapter implements DeliveryGateway {
  constructor(private api: ExternalProviderApi) {}

  async createOrder(total: number) {
    const response = await this.api.send({ amountInCents: total * 100 });
    return response.id;
  }
}`},{id:"observer",code:`type Listener = (cartTotal: number) => void;

class CartStore {
  private listeners: Listener[] = [];
  private total = 0;

  subscribe(listener: Listener) {
    this.listeners.push(listener);
  }

  updateTotal(total: number) {
    this.total = total;
    this.listeners.forEach((listener) => listener(this.total));
  }
}`},{id:"repository",code:`interface ProductRepository {
  findByTenant(tenantId: string): Promise<Product[]>;
}

class PrismaProductRepository implements ProductRepository {
  async findByTenant(tenantId: string) {
    return prisma.product.findMany({ where: { tenantId } });
  }
}`},{id:"command",code:`interface Command {
  execute(): Promise<void>;
}

class CreateOrderCommand implements Command {
  constructor(private readonly service: OrderService) {}

  async execute() {
    await this.service.create();
  }
}

class CommandBus {
  async run(command: Command) {
    await command.execute();
  }
}`}],j=[{id:"react-component",category:"front-end",code:`import { render, screen } from "@testing-library/react";
import { CTAButton } from "./CTAButton";

test("renderiza CTA com nome acessivel", () => {
  render(<CTAButton label="Solicitar orcamento" />);
  expect(screen.getByRole("button", { name: /solicitar orcamento/i })).toBeInTheDocument();
});`},{id:"accessible-form",category:"front-end",code:`test("mostra erro com aria-describedby", async () => {
  render(<ContactForm />);
  await user.click(screen.getByRole("button", { name: /enviar/i }));
  const emailInput = screen.getByLabelText(/e-mail/i);
  expect(emailInput).toHaveAttribute("aria-invalid", "true");
  expect(emailInput).toHaveAttribute("aria-describedby", "email-error");
});`},{id:"api-create-product",category:"back-end",code:`it("cria produto com tenant correto", async () => {
  const response = await request(app)
    .post("/products")
    .set("x-tenant-id", "tenant-a")
    .send({ name: "Pizza", price: 49.9 });

  expect(response.status).toBe(201);
  expect(response.body.tenantId).toBe("tenant-a");
});`},{id:"tenant-isolation",category:"seguranca",code:`it("impede acesso entre tenants", async () => {
  const product = await seedProduct({ tenantId: "tenant-a" });

  const response = await request(app)
    .get(\`/products/\${product.id}\`)
    .set("x-tenant-id", "tenant-b");

  expect(response.status).toBe(404);
});`},{id:"currency-format",category:"regra",code:`test("formata BRL corretamente", () => {
  expect(formatCurrency(1999.9)).toBe("R$ 1.999,90");
});`},{id:"cart-rule",category:"regra",code:`test("aplica frete gratis acima de 120", () => {
  const result = calculateCartTotal({ subtotal: 140, shipping: 15 });
  expect(result.shipping).toBe(0);
});`}],f=[{id:"format-currency",code:`export const formatCurrency = (value) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(value || 0));`},{id:"create-whatsapp-link",code:'export const createWhatsAppLink = (phone, message) => {\n  const normalized = String(phone).replace(/\\D/g, "");\n  return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`;\n};'},{id:"use-local-storage",code:`import { useEffect, useState } from "react";

export const useLocalStorage = (key, initial) => {
  const [state, setState] = useState(() => {
    const cached = localStorage.getItem(key);
    return cached ? JSON.parse(cached) : initial;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};`},{id:"zod-validation",code:`import { z } from "zod";

export const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
});`},{id:"debounce",code:`export const debounce = (fn, delay = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};`},{id:"slugify",code:`export const slugify = (value) =>
  String(value)
    .normalize("NFD")
    .replace(/[\\u0300-\\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\\s-]/g, "")
    .replace(/\\s+/g, "-");`},{id:"class-helper",code:'export const cx = (...classes) => classes.filter(Boolean).join(" ");'},{id:"api-error-handler",code:`export const handleApiError = (error) => {
  if (error?.response?.data?.message) return error.response.data.message;
  return "Erro inesperado. Tente novamente.";
};`}],C=["focus-visible","heading-structure","modal-accessible","aria-describedby","button-accessible-name","color-contrast","keyboard-navigation","image-alt","reduced-motion"],N=["landing-ai-agent","saas-multitenant","delivery-ai","ecommerce-admin","web-game-reward-ads","portfolio-virtual-agent"],S=(a=1800)=>{const[n,r]=l.useState(""),[t,o]=l.useState(""),c=l.useRef(null),m=()=>{c.current&&(clearTimeout(c.current),c.current=null)},s=l.useCallback(async p=>{var h;if(m(),o(""),!p)return o("empty"),!1;try{if((h=navigator==null?void 0:navigator.clipboard)!=null&&h.writeText)await navigator.clipboard.writeText(p);else{const i=document.createElement("textarea");i.value=p,i.style.position="fixed",i.style.left="-9999px",document.body.appendChild(i),i.focus(),i.select(),document.execCommand("copy"),document.body.removeChild(i)}return r(p),c.current=setTimeout(()=>{r("")},a),!0}catch(i){return console.error("Copy failed",i),o("copy-failed"),!1}},[a]),b=l.useCallback(()=>{m(),r(""),o("")},[]);return{copy:s,copiedText:n,error:t,reset:b,hasCopied:!!n}};function u({code:a,className:n=""}){const{t:r}=g(),{copy:t,hasCopied:o}=S(),c=async()=>{await t(a)};return e.jsxs("div",{className:"copy-wrapper",children:[e.jsx("button",{type:"button",onClick:c,className:`copy-button ${n}`.trim(),"aria-label":r("devlab.copyCodeAria","Copiar codigo"),children:o?r("devlab.copied","Copiado"):r("devlab.copyCode","Copiar codigo")}),e.jsx("span",{className:"sr-only",role:"status","aria-live":"polite",children:o?r("devlab.copiedMessage","Codigo copiado"):""})]})}function d({code:a}){return e.jsx("pre",{className:"devlab-code-block",tabIndex:0,children:e.jsx("code",{children:a})})}function $({tab:a,isActive:n,onClick:r,t}){return e.jsx("button",{id:`devlab-tab-${a}`,type:"button",role:"tab","aria-selected":n,"aria-controls":`devlab-panel-${a}`,className:`devlab-tab ${n?"is-active":""}`.trim(),onClick:r,children:t(`devlab.tabs.${a}`,a)})}function T({item:a,t:n}){return e.jsxs("article",{className:"devlab-card",children:[e.jsxs("header",{className:"devlab-card-header",children:[e.jsx("h4",{children:n(`devlab.components.items.${a.id}.name`,a.id)}),e.jsx("p",{children:n(`devlab.components.items.${a.id}.description`,"")})]}),e.jsx("div",{className:"devlab-preview","aria-hidden":"true",children:e.jsx("span",{children:n("devlab.preview","Preview")})}),e.jsx(d,{code:a.code}),e.jsx(u,{code:a.code}),e.jsxs("div",{className:"devlab-meta-row",children:[e.jsxs("p",{children:[e.jsxs("strong",{children:[n("devlab.technologies","Tecnologias"),": "]}),a.technologies.join(", ")]}),e.jsxs("p",{children:[e.jsxs("strong",{children:[n("devlab.accessibilityNote","Acessibilidade"),": "]}),n(`devlab.components.items.${a.id}.a11y`,"")]})]})]})}function w({item:a,t:n}){return e.jsxs("article",{className:"devlab-card",children:[e.jsx("h4",{children:n(`devlab.patterns.items.${a.id}.name`,a.id)}),e.jsx("p",{children:n(`devlab.patterns.items.${a.id}.problem`,"")}),e.jsx("p",{children:n(`devlab.patterns.items.${a.id}.where`,"")}),e.jsx("p",{children:n(`devlab.patterns.items.${a.id}.summary`,"")}),e.jsx(d,{code:a.code}),e.jsx(u,{code:a.code})]})}function A({item:a,t:n}){return e.jsxs("article",{className:"devlab-card",children:[e.jsx("span",{className:"devlab-chip",children:n(`devlab.tests.categories.${a.category}`,a.category)}),e.jsx("h4",{children:n(`devlab.tests.items.${a.id}.name`,a.id)}),e.jsx("p",{children:n(`devlab.tests.items.${a.id}.validation`,"")}),e.jsx("p",{children:n(`devlab.tests.items.${a.id}.technicalExplanation`,"")}),e.jsx(d,{code:a.code}),e.jsx(u,{code:a.code})]})}function P({item:a,t:n}){return e.jsxs("article",{className:"devlab-card",children:[e.jsx("h4",{children:n(`devlab.snippets.items.${a.id}.name`,a.id)}),e.jsx("p",{children:n(`devlab.snippets.items.${a.id}.description`,"")}),e.jsxs("p",{children:[e.jsxs("strong",{children:[n("devlab.whenToUse","Quando usar"),": "]}),n(`devlab.snippets.items.${a.id}.whenToUse`,"")]}),e.jsx(d,{code:a.code}),e.jsx(u,{code:a.code})]})}function L({id:a,t:n}){return e.jsxs("article",{className:"devlab-card",children:[e.jsx("h4",{children:n(`devlab.accessibilityLab.items.${a}.title`,a)}),e.jsxs("p",{children:[e.jsxs("strong",{children:[n("devlab.before","Antes"),": "]}),n(`devlab.accessibilityLab.items.${a}.before`,"")]}),e.jsxs("p",{children:[e.jsxs("strong",{children:[n("devlab.after","Depois"),": "]}),n(`devlab.accessibilityLab.items.${a}.after`,"")]}),e.jsx("p",{children:n(`devlab.accessibilityLab.items.${a}.explanation`,"")}),e.jsx(d,{code:n(`devlab.accessibilityLab.items.${a}.code`,"")}),e.jsxs("p",{children:[e.jsx("strong",{children:"WCAG: "}),n(`devlab.accessibilityLab.items.${a}.wcag`,"")]})]})}function D({id:a,t:n}){const r=n(`devlab.architectures.items.${a}.diagram`,"");return e.jsxs("article",{className:"devlab-card",children:[e.jsx("h4",{children:n(`devlab.architectures.items.${a}.name`,a)}),e.jsx("pre",{className:"devlab-diagram","aria-label":n("devlab.diagram","Diagrama"),children:r}),e.jsxs("p",{children:[e.jsxs("strong",{children:[n("devlab.technologies","Tecnologias"),": "]}),n(`devlab.architectures.items.${a}.technologies`,"")]}),e.jsxs("p",{children:[e.jsxs("strong",{children:[n("devlab.technicalDecisions","Decisoes tecnicas"),": "]}),n(`devlab.architectures.items.${a}.decisions`,"")]}),e.jsxs("p",{children:[e.jsxs("strong",{children:[n("devlab.problemsSolved","Problemas resolvidos"),": "]}),n(`devlab.architectures.items.${a}.problemsSolved`,"")]})]})}function R({t:a}){const[n,r]=l.useState({phone:"5561999999999",message:"Ola! Quero um projeto com IA.",ctaLabel:"Solicitar orcamento",ctaHref:"https://wa.me/5561981774548",productName:"Togyro Delivery IA",productPrice:199,productTag:"SaaS",discountBase:240,discountPercent:15,layoutChoice:"landing",agentContext:"Quero aumentar leads de restaurante"}),t=l.useMemo(()=>`https://wa.me/${String(n.phone).replace(/\D/g,"")}?text=${encodeURIComponent(n.message)}`,[n.phone,n.message]),o=`<a class="tg-cta" href="${n.ctaHref}" target="_blank" rel="noopener noreferrer">${n.ctaLabel}</a>`,c=Number(n.discountBase)*(Number(n.discountPercent)/100),m=Number(n.discountBase)-c,s=b=>p=>{r(h=>({...h,[b]:p.target.value}))};return e.jsxs("div",{className:"devlab-grid",children:[e.jsxs("article",{className:"devlab-card",children:[e.jsx("h4",{children:a("devlab.playground.items.whatsapp-generator.name","Gerador de link para WhatsApp")}),e.jsx("label",{htmlFor:"playground-phone",children:a("devlab.playground.phone","Telefone")}),e.jsx("input",{id:"playground-phone",value:n.phone,onChange:s("phone")}),e.jsx("label",{htmlFor:"playground-message",children:a("devlab.playground.message","Mensagem")}),e.jsx("input",{id:"playground-message",value:n.message,onChange:s("message")}),e.jsx("p",{className:"devlab-inline-preview",children:t}),e.jsx(u,{code:t})]}),e.jsxs("article",{className:"devlab-card",children:[e.jsx("h4",{children:a("devlab.playground.items.cta-generator.name","Gerador de botao CTA")}),e.jsx("label",{htmlFor:"playground-cta-label",children:a("devlab.playground.label","Texto")}),e.jsx("input",{id:"playground-cta-label",value:n.ctaLabel,onChange:s("ctaLabel")}),e.jsx("label",{htmlFor:"playground-cta-href",children:"URL"}),e.jsx("input",{id:"playground-cta-href",value:n.ctaHref,onChange:s("ctaHref")}),e.jsx("div",{className:"devlab-preview",children:e.jsx("a",{href:n.ctaHref,children:n.ctaLabel})}),e.jsx(d,{code:o}),e.jsx(u,{code:o})]}),e.jsxs("article",{className:"devlab-card",children:[e.jsx("h4",{children:a("devlab.playground.items.product-card-preview.name","Preview de card de produto")}),e.jsx("label",{htmlFor:"playground-product-name",children:a("devlab.playground.product","Produto")}),e.jsx("input",{id:"playground-product-name",value:n.productName,onChange:s("productName")}),e.jsx("label",{htmlFor:"playground-product-price",children:a("devlab.playground.price","Preco")}),e.jsx("input",{id:"playground-product-price",value:n.productPrice,onChange:s("productPrice")}),e.jsx("label",{htmlFor:"playground-product-tag",children:a("devlab.playground.tag","Tag")}),e.jsx("input",{id:"playground-product-tag",value:n.productTag,onChange:s("productTag")}),e.jsxs("div",{className:"devlab-preview",children:[e.jsx("strong",{children:n.productName}),e.jsxs("span",{children:["R$ ",Number(n.productPrice).toFixed(2)]}),e.jsx("em",{children:n.productTag})]})]}),e.jsxs("article",{className:"devlab-card",children:[e.jsx("h4",{children:a("devlab.playground.items.discount-simulator.name","Simulador de desconto")}),e.jsx("label",{htmlFor:"playground-base",children:a("devlab.playground.base","Valor base")}),e.jsx("input",{id:"playground-base",value:n.discountBase,onChange:s("discountBase")}),e.jsx("label",{htmlFor:"playground-percent",children:a("devlab.playground.discount","Desconto")}),e.jsx("input",{id:"playground-percent",value:n.discountPercent,onChange:s("discountPercent")}),e.jsxs("p",{children:[a("devlab.playground.finalTotal","Total final"),": R$"," ",m.toFixed(2)]})]}),e.jsxs("article",{className:"devlab-card",children:[e.jsx("h4",{children:a("devlab.playground.items.layout-choice.name","Simulador de escolha de layout")}),e.jsx("label",{htmlFor:"playground-layout",children:a("devlab.playground.layout","Layout")}),e.jsxs("select",{id:"playground-layout",value:n.layoutChoice,onChange:s("layoutChoice"),children:[e.jsx("option",{value:"landing",children:"Landing Page"}),e.jsx("option",{value:"dashboard",children:"Dashboard SaaS"}),e.jsx("option",{value:"catalog",children:"Catalogo E-commerce"})]}),e.jsx("p",{children:a(`devlab.playground.layoutDescriptions.${n.layoutChoice}`,"")})]}),e.jsxs("article",{className:"devlab-card",children:[e.jsx("h4",{children:a("devlab.playground.items.agent-message.name","Simulador de mensagem de agente IA")}),e.jsx("label",{htmlFor:"playground-agent-context",children:a("devlab.playground.context","Contexto")}),e.jsx("input",{id:"playground-agent-context",value:n.agentContext,onChange:s("agentContext")}),e.jsx(d,{code:`[agente-ia]
Contexto: ${n.agentContext}
Resposta: Vamos priorizar regra de negocio, acessibilidade e experimento rapido.`})]})]})}function z(){const{t:a}=g(),[n,r]=l.useState("playground");return e.jsxs("section",{id:"dev-lab",className:"devlab-section","aria-labelledby":"devlab-title",children:[e.jsxs("header",{className:"devlab-hero",children:[e.jsx("p",{className:"devlab-eyebrow",children:a("devlab.eyebrow","Laboratorio Dev")}),e.jsx("h2",{id:"devlab-title",children:a("devlab.title","Yago Dev Lab")}),e.jsx("p",{children:a("devlab.subtitle","Experimentos, componentes, padroes e decisoes tecnicas criadas por mim.")})]}),e.jsx("div",{className:"devlab-tabs",role:"tablist","aria-label":a("devlab.tabsAria","Categorias do Dev Lab"),children:v.map(t=>e.jsx($,{tab:t,isActive:n===t,onClick:()=>r(t),t:a},t))}),e.jsxs("div",{id:`devlab-panel-${n}`,role:"tabpanel","aria-labelledby":`devlab-tab-${n}`,className:"devlab-panel",children:[n==="components"&&e.jsx("div",{className:"devlab-grid",children:x.map(t=>e.jsx(T,{item:t,t:a},t.id))}),n==="patterns"&&e.jsx("div",{className:"devlab-grid",children:y.map(t=>e.jsx(w,{item:t,t:a},t.id))}),n==="tests"&&e.jsx("div",{className:"devlab-grid",children:j.map(t=>e.jsx(A,{item:t,t:a},t.id))}),n==="snippets"&&e.jsx("div",{className:"devlab-grid",children:f.map(t=>e.jsx(P,{item:t,t:a},t.id))}),n==="accessibility"&&e.jsx("div",{className:"devlab-grid",children:C.map(t=>e.jsx(L,{id:t,t:a},t))}),n==="architecture"&&e.jsx("div",{className:"devlab-grid",children:N.map(t=>e.jsx(D,{id:t,t:a},t))}),n==="playground"&&e.jsx(R,{t:a})]}),e.jsx("footer",{className:"devlab-footer-note",children:e.jsx("p",{children:a("devlab.footerNote","Todos os exemplos sao educacionais e focados em reuso, negocio e acessibilidade.")})})]})}export{z as DevLabSection,z as default};
