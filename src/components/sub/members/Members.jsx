import Layout from '../../common/layout/Layout';
import './Members.scss';

export default function Members() {
	return (
		<Layout title={'Members'}>
			<div className='wrap'>
				<div className='infoBox'>
					<h2>Join Members</h2>
				</div>
				<div className='formBox'>
					<form>
						<fieldset>
							<legend className='h'>회원가입 폼</legend>
							<table>
								<tbody>
									{/* userid, email */}
									<tr>
										<td>
											<input
												type='text'
												name='userid'
												placeholder='User ID'
											/>
										</td>
										<td>
											<input
												type='text'
												name='email'
												placeholder='Email'
											/>
										</td>
									</tr>

									{/* pwd1, pwd2 */}
									<tr>
										<td>
											<input
												type='password'
												name='pwd1'
												placeholder='Password'
											/>
										</td>
										<td>
											<input
												type='password'
												name='pwd2'
												placeholder='Re-Password'
											/>
										</td>
									</tr>

									{/* edu */}
									<tr>
										<td colSpan='2'>
											<select name='edu'>
												<option value=''>Education</option>
												<option value='elementary-school'>초등학교 졸업</option>
												<option value='middle-school'>중학교 졸업</option>
												<option value='high-school'>고등학교 졸업</option>
												<option value='college'>대학교 졸업</option>
											</select>
										</td>
									</tr>

									{/* gender */}
									<tr>
										<td colSpan='2'>
											<input
												type='radio'
												defaultValue='female'
												id='female'
												name='gender'
											/>
											<label htmlFor='female'>Female</label>

											<input
												type='radio'
												defaultValue='male'
												id='male'
												name='gender'
											/>
											<label htmlFor='male'>Male</label>
										</td>
									</tr>

									{/* interests */}
									<tr>
										<td colSpan='2'>
											<input
												type='checkbox'
												name='interest'
												id='sports'
												defaultValue='sports'
											/>
											<label htmlFor='sports'>Sports</label>

											<input
												type='checkbox'
												name='interest'
												id='reading'
												defaultValue='reading'
											/>
											<label htmlFor='reading'>Reading</label>

											<input
												type='checkbox'
												name='interest'
												id='music'
												defaultValue='music'
											/>
											<label htmlFor='music'>Music</label>

											<input
												type='checkbox'
												name='interest'
												id='game'
												defaultValue='game'
											/>
											<label htmlFor='game'>Game</label>
										</td>
									</tr>

									{/* comments  */}
									<tr>
										<td colSpan='2'>
											<textarea
												name='comments'
												cols='30'
												rows='5'
												placeholder='Leave a comment'></textarea>
										</td>
									</tr>
									<tr>
										<td colSpan='2'>
											<input
												type='reset'
												value='Cancel'
											/>
											<input
												type='submit'
												value='Submit'
											/>
										</td>
									</tr>
								</tbody>
							</table>
						</fieldset>
					</form>
				</div>
			</div>
		</Layout>
	);
}

/*
	throttle vs debounce
	throttle : 물리적으로 핸들러함수 호출자체를 일정횟수로 줄임
	debounce : 특정 이벤트가 단시간에 반복으로 계속 발생하고 있으면 핸들러함수 호출 자체를 계속 뒤로 밀면서 호출 막음
*/

/*
	- 리액트에서의 폼 인증 구현 로직 순서
		1. 폼요소에 입력하는 값을 이벤트 핸들러 함수를 통해 실시간으로 state에 저장
		2. state값이 변경될때마다 check 함수를 통해 항목별로 인증 실패시 에러 객체로 묶어서 반환
		3. 폼에 submitHandler 함수를 연결
		4. 전송이벤트가 발생시 submitHandler함수 안쪽에서 check함수를 호출해서 err객체가 있으면 인증 실패
		5. check함수가 내보내는 err객체가 없으면 인증 성공처리
*/
