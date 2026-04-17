import { cn } from "#/lib/utils";
import { Link } from "@tanstack/react-router";

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
  const breadcrumbLink =
    title === "Account Register"
      ? "/auth/register"
      : title === "Account Login"
        ? "/auth/login"
        : "/";

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
            <Link to="/" className="hover:text-white/80">
              Home
            </Link>
            <span className="text-white/30">|</span>
            <Link
              to={breadcrumbLink}
              className="text-white/30 hover:text-white/80"
            >
              {breadcrumb}
            </Link>
          </div>
        )}
      </article>
    </div>
  );
}
