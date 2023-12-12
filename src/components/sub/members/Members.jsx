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
