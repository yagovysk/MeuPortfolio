# 🌟 Menu de Acessibilidade - Documentação

## 📋 Visão Geral

O Menu de Acessibilidade é um componente flutuante que oferece recursos para melhorar a experiência de usuários com diferentes necessidades de acessibilidade.

## ✨ Recursos Disponíveis

### 1. 🔤 Controle de Tamanho da Fonte

- **Aumentar**: Aumenta o tamanho da fonte em 10% (máximo 150%)
- **Diminuir**: Diminui o tamanho da fonte em 10% (mínimo 70%)
- **Resetar**: Volta ao tamanho padrão (100%)
- Indicador visual mostra o tamanho atual

### 2. 🎨 Controle de Contraste

- **Normal**: Contraste padrão do site
- **Alto Contraste**: Aumenta o contraste para melhor legibilidade
- Útil para usuários com baixa visão

### 3. 🌓 Controle de Tema

- **Tema Claro**: Fundo claro com texto escuro (padrão)
- **Tema Escuro**: Fundo escuro com texto claro
- Reduz cansaço visual em ambientes com pouca luz

### 4. 🔄 Resetar Tudo

- Restaura todas as configurações para o padrão
- Remove preferências salvas

## 💾 Persistência de Dados

Todas as configurações são salvas automaticamente no `localStorage` do navegador:

- `fontSize`: Tamanho da fonte atual
- `contrast`: Modo de contraste (normal/high)
- `theme`: Tema atual (light/dark)

As preferências são mantidas mesmo após fechar o navegador.

## 🎯 Localização

O botão flutuante aparece no canto inferior direito da tela:

- **Desktop**: 1.25rem do canto
- **Tablet**: 1rem do canto
- **Mobile**: 0.75rem do canto

## 🎨 Design

### Cores Principais

- **Primária**: `#6c63ff` (Roxo vibrante)
- **Hover**: `#5a52d5` (Roxo escuro)
- **Resetar**: `#ff6b6b` (Vermelho)
- **Fundo**: Branco/Escuro (conforme tema)

### Animações

- **Slide In**: Menu desliza da direita (300ms)
- **Fade In**: Overlay aparece suavemente (300ms)
- **Hover**: Elevação e mudança de cor
- **Rotação**: Botão fechar gira 90° no hover

## ♿ Acessibilidade Implementada

### Navegação por Teclado

- Todos os botões são focáveis
- Outline visível ao focar (3px roxo)
- Tab order lógico

### ARIA Labels

- `aria-label` em todos os botões
- Títulos descritivos no atributo `title`
- Contexto claro para leitores de tela

### Reduced Motion

- Respeita preferência `prefers-reduced-motion`
- Remove animações se usuário preferir

## 📱 Responsividade

### Desktop (>768px)

- Menu: 320px de largura
- Botão: 3.5rem de diâmetro
- Espaçamento: 1.25rem

### Tablet (768px)

- Menu: calc(100% - 2rem)
- Botão: 3.25rem
- Espaçamento: 1rem

### Mobile (480px)

- Menu: calc(100% - 1.5rem)
- Botão: 3rem
- Controles menores

### Small Mobile (360px)

- Menu: calc(100% - 1rem)
- Botão: 2.75rem
- Padding reduzido

## 🚀 Como Usar

### Para Desenvolvedores

1. Importe o componente:

```jsx
import Accessibility from "./Components/Accessibility/Accessibility";
```

2. Adicione ao seu componente:

```jsx
<Accessibility />
```

3. Certifique-se de que está incluído em todas as páginas principais.

### Para Usuários

1. Clique no botão de acessibilidade (ícone de pessoa com círculo)
2. Ajuste as configurações conforme necessário:
   - Use os botões +/- para ajustar fonte
   - Clique em "Contraste" para alternar
   - Clique em "Tema" para alternar modo escuro
3. Clique fora do menu ou no X para fechar
4. Suas preferências serão salvas automaticamente

## 🔧 Configurações Técnicas

### Estados Gerenciados

```javascript
- isOpen: Controla visibilidade do menu
- fontSize: Tamanho da fonte (70-150%)
- contrast: Modo de contraste (normal/high)
- theme: Tema (light/dark)
```

### CSS Classes Aplicadas

```css
- .contrast-normal: Contraste normal
- .contrast-high: Alto contraste (filter: contrast(1.5))
- .theme-light: Tema claro
- .theme-dark: Tema escuro (background + inversão de cores)
```

## 📊 Compatibilidade

- ✅ Chrome/Edge (últimas versões)
- ✅ Firefox (últimas versões)
- ✅ Safari (últimas versões)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🎓 Benefícios

### Para Usuários

- Melhor legibilidade
- Redução de cansaço visual
- Personalização da experiência
- Inclusão de pessoas com deficiência visual

### Para o Site

- Conformidade com WCAG 2.1
- Melhora na experiência do usuário
- Diferencial competitivo
- Demonstra responsabilidade social

## 📝 Notas Importantes

1. **Persistência**: Configurações são salvas localmente
2. **Performance**: Usa CSS filters e font-size, não recarrega página
3. **Compatibilidade**: Funciona em todos navegadores modernos
4. **Manutenção**: Código modular e fácil de atualizar

## 🔮 Possíveis Melhorias Futuras

- [ ] Perfis de acessibilidade predefinidos
- [ ] Controle de espaçamento entre linhas
- [ ] Modo de leitura focado
- [ ] Guia de linha de leitura
- [ ] Dicionário de termos
- [ ] Atalhos de teclado configuráveis

---

**Desenvolvido com ❤️ e acessibilidade em mente**
