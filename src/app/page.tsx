import ContextProviders from '@/context/ContextProviders';
import AppShell from '@/components/AppShell';

export default function Home() {
  return (
    <ContextProviders>
      <AppShell />
    </ContextProviders>
  );
}
