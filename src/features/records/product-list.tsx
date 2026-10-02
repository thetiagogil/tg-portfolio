import { StackLine } from "@/components/entries/stack";
import { Icon } from "@/components/ui/icon";
import { SmartLink } from "@/components/ui/smart-link";
import type { Lang, Product } from "@/content/types";

type ProductListProps = {
  products: Product[];
  lang: Lang;
};

/** Products or highlights, one under another; a linked one opens out (↗) or downloads (↓). */
export function ProductList({ products, lang }: ProductListProps) {
  return (
    <ul className="grid max-w-[34em] gap-8">
      {products.map((product) => (
        <li key={product.label.en}>
          {product.href ? (
            <SmartLink href={product.href} className="group block">
              <ProductBody product={product} lang={lang} />
            </SmartLink>
          ) : (
            <ProductBody product={product} lang={lang} />
          )}
        </li>
      ))}
    </ul>
  );
}

function ProductBody({ product, lang }: { product: Product; lang: Lang }) {
  const icon = product.href && (/^https?:/.test(product.href) ? "out" : "dl");

  return (
    <>
      <h3 className="subheading group-hover:text-accent-ink inline-flex items-baseline gap-2 transition-colors duration-300">
        {product.label[lang]}
        {icon && <Icon name={icon} className="text-ink-3 size-3.5" />}
      </h3>
      <p className="text-ink-2 mt-2 max-w-[40em]">{product.description[lang]}</p>
      <StackLine techs={product.techs} className="mt-3" />
    </>
  );
}
