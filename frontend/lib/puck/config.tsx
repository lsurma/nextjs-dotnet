import { Config } from "@puckeditor/core";

export type UserConfig = {
  HeadingBlock: {
    title: string;
    level: "1" | "2" | "3";
  };
  TextBlock: {
    text: string;
  };
  ButtonBlock: {
    text: string;
    href: string;
    variant: "primary" | "secondary";
  };
  ImageBlock: {
    url: string;
    alt: string;
  };
  ProductListBlock: {
    title: string;
  };
};

export const config: Config<UserConfig> = {
  components: {
    HeadingBlock: {
      label: "Heading",
      fields: {
        title: { type: "text", label: "Title" },
        level: {
          type: "select",
          label: "Level",
          options: [
            { label: "H1", value: "1" },
            { label: "H2", value: "2" },
            { label: "H3", value: "3" },
          ],
        },
      },
      defaultProps: {
        title: "Heading",
        level: "1",
      },
      render: ({ title, level }) => {
        const Tag = `h${level}` as keyof JSX.IntrinsicElements;
        const className = level === "1" ? "text-4xl font-bold mb-4" : level === "2" ? "text-3xl font-semibold mb-3" : "text-2xl font-medium mb-2";
        return <Tag className={className}>{title}</Tag>;
      },
    },
    TextBlock: {
      label: "Text",
      fields: {
        text: { type: "textarea", label: "Text" },
      },
      defaultProps: {
        text: "Enter your text here...",
      },
      render: ({ text }) => {
        return <p className="mb-4 text-gray-700">{text}</p>;
      },
    },
    ButtonBlock: {
      label: "Button",
      fields: {
        text: { type: "text", label: "Button Text" },
        href: { type: "text", label: "Link URL" },
        variant: {
          type: "select",
          label: "Variant",
          options: [
            { label: "Primary", value: "primary" },
            { label: "Secondary", value: "secondary" },
          ],
        },
      },
      defaultProps: {
        text: "Click me",
        href: "#",
        variant: "primary",
      },
      render: ({ text, href, variant }) => {
        const baseClasses = "inline-block px-6 py-3 rounded-lg font-medium transition-colors";
        const variantClasses = variant === "primary" 
          ? "bg-blue-600 text-white hover:bg-blue-700" 
          : "bg-gray-200 text-gray-800 hover:bg-gray-300";
        return (
          <a href={href} className={`${baseClasses} ${variantClasses}`}>
            {text}
          </a>
        );
      },
    },
    ImageBlock: {
      label: "Image",
      fields: {
        url: { type: "text", label: "Image URL" },
        alt: { type: "text", label: "Alt Text" },
      },
      defaultProps: {
        url: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800",
        alt: "Placeholder image",
      },
      render: ({ url, alt }) => {
        return (
          <div className="mb-4">
            <img src={url} alt={alt} className="w-full h-auto rounded-lg" />
          </div>
        );
      },
    },
    ProductListBlock: {
      label: "Product List",
      fields: {
        title: { type: "text", label: "Section Title" },
      },
      defaultProps: {
        title: "Our Products",
      },
      render: ({ title }) => {
        return (
          <div className="mb-8">
            <h2 className="text-3xl font-semibold mb-4">{title}</h2>
            <p className="text-gray-600">Product list will be loaded dynamically from the backend...</p>
          </div>
        );
      },
    },
  },
};
