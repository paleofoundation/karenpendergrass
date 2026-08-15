import type { Metadata } from 'next';
import SafariLeaderboard from '@/components/frontier/SafariLeaderboard';

export const metadata: Metadata = {
  title: "Karen's Brain Leaderboard",
  description: "Scores, field notes, and visitor links from Karen's Brain at KarenPendergrass.com.",
};

export default function LeaderboardPage() {
  return <SafariLeaderboard />;
}
