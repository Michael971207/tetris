import pygame
import random

# Initialize Pygame
pygame.init()

# Define game constants
CELL_SIZE = 30
BOARD_WIDTH = 10
BOARD_HEIGHT = 20
COLORS = [(255, 255, 255), (255, 0, 0), (0, 255, 0), (0, 0, 255), (255, 255, 0), (0, 255, 255), (255, 0, 255)]

TETROMINOS = [    [[1, 1], [1, 1]],
    [[1, 1, 1, 1]],
    [[1, 1, 0], [0, 1, 1]],
    [[0, 1, 1], [1, 1, 0]],
    [[0, 1, 0], [1, 1, 1]],
    [[1, 0, 0], [1, 1, 1]],
    [[0, 0, 1], [1, 1, 1]]
]

# Define game variables
board = [[0] * BOARD_WIDTH for _ in range(BOARD_HEIGHT)]
current_tetromino = None
game_loop = None
score = 0
level = 1

def init():
    global board, current_tetromino, score, level, game_loop

    # Initialize game variables
    board = [[0] * BOARD_WIDTH for _ in range(BOARD_HEIGHT)]
    current_tetromino = generate_random_tetromino()
    score = 0
    level = 1

    # Initialize Pygame display
    screen_width = CELL_SIZE * BOARD_WIDTH
    screen_height = CELL_SIZE * BOARD_HEIGHT
    screen = pygame.display.set_mode((screen_width, screen_height))
    pygame.display.set_caption("Tetris")

    # Start game loop
    game_loop = GameLoop(screen)
    game_loop.start()

def generate_random_tetromino():
    shape = random.choice(TETROMINOS)
    color = random.randint(1, len(COLORS) - 1)
    x = BOARD_WIDTH // 2 - len(shape[0]) // 2
    y = 0
    return {"shape": shape, "color": color, "x": x, "y": y}

def add_tetromino_to_board():
    global board, current_tetromino

    for i in range(len(current_tetromino["shape"])):
        for j in range(len(current_tetromino["shape"][i])):
            if current_tetromino["shape"][i][j] == 1:
                board[current_tetromino["y"] + i][current_tetromino["x"] + j] = current_tetromino["color"]

def clear_lines():
    global board, score, level

    num_lines_cleared = 0
    for i in range(len(board)):
        if 0 not in board[i]:
            board.pop(i)
            board.insert(0, [0] * BOARD_WIDTH)
            num_lines_cleared += 1

    if num_lines_cleared > 0:
        score += 100 * num_lines_cleared
        level = score // 1000 + 1

class GameLoop:
    def __init__(self, screen):
        self.screen = screen
