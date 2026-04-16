import { cn } from "#/lib/utils";

type props = React.HTMLProps<HTMLDivElement> & {
  title: string;
  auth?: boolean;
};

export default function PageHeader({
  title,
  auth = false,
  className,
  ...elmProps
}: props) {
  // Extract "Login" from "Account Login" for the breadcrumb
  const breadcrumb = title.replace("Account ", "");

  return (
    <div
      {...elmProps}
      className={cn(
        "flex h-48 items-center bg-[url('/imgs/city.png')] bg-cover bg-center md:h-48",
        className,
      )}
    >
      <article className="bg-primary/90 flex h-full w-full flex-col items-center justify-center gap-4 text-white bg-blend-multiply">
        <h1
          className={cn(
            "text-center font-bold text-white",
            auth ? "text-2xl md:text-3xl" : "text-3xl md:text-5xl",
          )}
        >
          {title}
        </h1>

        {auth && (
          <div className="flex items-center gap-2 text-sm font-light md:text-base">
            <span>Home</span>
            <span className="text-white/30">|</span>
            <span className="text-white/30">{breadcrumb}</span>
          </div>
        )}
      </article>
    </div>
  );
}
