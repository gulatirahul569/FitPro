import Hero from "@/components/home/Hero";
import FeaturedTrainers from "@/components/home/FeaturedTrainers";
import HowItWorks from "@/components/home/HowItWorks";
import Categories from "@/components/home/Categories";
import VideoSection from "@/components/home/VideoSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import BecomeTrainer from "@/components/home/BecomeTrainer";
import FinalCta from "@/components/home/FinalCta";
import OurStory from "@/components/home/Ourstory";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedTrainers />
      <OurStory />
      <HowItWorks />
      <VideoSection />
      <WhyChooseUs />
      <Testimonials />
      <BecomeTrainer />
      <Categories />
      <FinalCta />
    </main>
  );
}