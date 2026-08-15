import type { Metadata } from 'next';
import SafariLeaderboard from '@/components/frontier/SafariLeaderboard';

export const metadata: Metadata = {
  title: 'Swovee Safari Leaderboard',
  description: 'Scores, field notes, and visitor links from the Swovee Safari at KarenPendergrass.com.',
};

export default function LeaderboardPage() {
  return <SafariLeaderboard />;
}
