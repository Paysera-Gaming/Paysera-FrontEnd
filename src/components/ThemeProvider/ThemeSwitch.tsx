import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/ThemeProvider/ThemeProvider';

export function ModeToggle() {
	const { setTheme, theme } = useTheme();

	function handleTheme() {
		switch (theme) {
			case 'dark':
				setTheme('light');
				break;
			case 'light':
				setTheme('dark');
				break;
			case 'system':
				setTheme('dark');
		}
	}

	return (
		<Button variant="ghost" size="icon" onClick={handleTheme}>
			<Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
			<Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
		</Button>
	);
}
