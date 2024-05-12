import { Navigate } from "react-router-dom";
import { ChessBoard } from "../components/ChessBoard";
import { Button } from "../components/Button";
import { useSocket } from "../hooks/useSocket";
import { useEffect } from "react";

export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";

export const Game = () => {
	const socket = useSocket();
	useEffect(() => {
		if (!socket) return;
		socket.onmessage = (event) => {
			const message = JSON.parse(event.data);
			console.log(message);
			switch (message.type) {
				case INIT_GAME:
					console.log("Game initialised");
					break;
				case MOVE:
					console.log("Move made");
					break;
				case GAME_OVER:
					console.log("Game over");
					break;
			}
		};
	}, [socket]);
	if (!socket) return <div>Connecting...</div>;
	return (
		<div className='flex justify-center'>
			<div className='pt-8 mx-w-screen-lg'>
				<div className='grid grid-cols-6 gap-4 '>
					<div className='col-span-4 bg-red-200 w-full'>
						<ChessBoard />
					</div>
					<div>
						<Button
							onClick={() =>
								socket.send(
									JSON.stringify({
										type: INIT_GAME,
									})
								)
							}>
							Play Online
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};
