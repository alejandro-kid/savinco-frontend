export interface HeroProps {
  title: string;
  description: string;
}

export const Hero = ({ title, description }: HeroProps) => {
  return (
    <div className="mb-6 text-center sm:mb-8">
      <h1 className="mb-2 text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">{title}</h1>
      <p className="mx-auto max-w-2xl text-base text-gray-600 sm:text-lg md:text-xl">
        {description}
      </p>
    </div>
  );
};
