import { useQuery } from '@tanstack/react-query';

const path = process.env.PUBLIC_URL;

const fetchHistory = async () => {
	const data = await fetch(`${path}/DB/history.json`);
	const json = await data.json();
	return json.history;
};

export const useHistoryQuery = () => {
	return useQuery(['fetchHistory'], fetchHistory, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 60 * 60 * 24,
		staleTime: 1000 * 60 * 60 * 24,
		retry: 3
	});
};
