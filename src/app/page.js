import Hero from "@/components/home/Hero";
import FeaturedTrainers from "@/components/home/FeaturedTrainers";
import HowItWorks from "@/components/home/HowItWorks";
import Categories from "@/components/home/Categories";
import VideoSection from "@/components/home/VideoSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import BecomeTrainer from "@/components/home/BecomeTrainer";
import FinalCta from "@/components/home/FinalCta";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedTrainers />
      <HowItWorks />
      <Categories />
      <VideoSection />
      <WhyChooseUs />
      <Testimonials />
      <BecomeTrainer />
      <FinalCta />
    </main>
  );
}