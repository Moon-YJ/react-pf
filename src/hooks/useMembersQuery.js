import { useQuery } from '@tanstack/react-query';

const path = process.env.PUBLIC_URL;

const fetchMembers = async () => {
	const data = await fetch(`${path}/DB/department.json`);
	const json = await data.json();
	return json.members;
};

export const useMembersQuery = () => {
	return useQuery(['fetchMembers'], fetchMembers, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 60 * 60 * 24, // 24시간
		staleTime: 1000 * 60 * 60 * 24, // 24시간동안 refetching 일어나지 않음
		retry: 3 // 데이터 요청 실패시 재시도 횟수 (default값 3)
	});
};
