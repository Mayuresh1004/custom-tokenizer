import pygame
import random
import sys

SCREEN_WIDTH = 288
SCREEN_HEIGHT = 512
PIPE_GAP_SIZE = 100
GRAVITY = 0.25
BIRD_JUMP = -4.5
PIPE_SPEED = -2

def draw_floor(screen, floor_img, floor_x_pos):
    screen.blit(floor_img, (floor_x_pos, 400))
    screen.blit(floor_img, (floor_x_pos + SCREEN_WIDTH, 400))

def create_pipe(pipe_img):
    random_pipe_pos = random.choice([200, 300, 350])
    bottom_pipe = pipe_img.get_rect(midtop=(350, random_pipe_pos))
    top_pipe = pipe_img.get_rect(midbottom=(350, random_pipe_pos - PIPE_GAP_SIZE))
    return bottom_pipe, top_pipe

def move_pipes(pipes):
    for pipe in pipes:
        pipe.centerx += PIPE_SPEED
    return pipes

def draw_pipes(screen, pipe_img, pipes):
    for pipe in pipes:
        if pipe.bottom >= SCREEN_HEIGHT:
            screen.blit(pipe_img, pipe)
        else:
            flip_pipe = pygame.transform.flip(pipe_img, False, True)
            screen.blit(flip_pipe, pipe)

def check_collision(pipes, bird):
    for pipe in pipes:
        if bird.colliderect(pipe):
            return False
    if bird.top <= -50 or bird.bottom >= 400:
        return False
    return True

def update_score(score, high_score):
    if score > high_score:
        high_score = score
    return high_score

def score_display(screen, game_font, score, high_score, game_active):
    if game_active:
        score_surface = game_font.render(str(int(score)), True, (255, 255, 255))
        score_rect = score_surface.get_rect(center=(SCREEN_WIDTH // 2, 50))
        screen.blit(score_surface, score_rect)
    else:
        score_surface = game_font.render(f'Score: {int(score)}', True, (255, 255, 255))
        score_rect = score_surface.get_rect(center=(SCREEN_WIDTH // 2, 50))
        screen.blit(score_surface, score_rect)
        high_score_surface = game_font.render(f'High score: {int(high_score)}', True, (255, 255, 255))
        high_score_rect = high_score_surface.get_rect(center=(SCREEN_WIDTH // 2, 85))
        screen.blit(high_score_surface, high_score_rect)
        game_over_surface = game_font.render('Press Space to Play', True, (255, 255, 255))
        game_over_rect = game_over_surface.get_rect(center=(SCREEN_WIDTH // 2, 350))
        screen.blit(game_over_surface, game_over_rect)

def main():
    pygame.init()
    screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
    pygame.display.set_caption('Flappy Bird')
    clock = pygame.time.Clock()
    game_font = pygame.font.Font(None, 40)

    game_active = False
    score = 0
    high_score = 0

    bird_surface = pygame.Surface((34, 24), pygame.SRCALPHA)
    pygame.draw.circle(bird_surface, (255, 255, 0), (17, 12), 12)
    bird_rect = bird_surface.get_rect(center=(50, SCREEN_HEIGHT // 2))
    bird_movement = 0

    pipe_surface = pygame.Surface((52, 320), pygame.SRCALPHA)
    pipe_surface.fill((0, 255, 0))
    pipe_list = []
    SPAWNPIPE = pygame.USEREVENT
    pygame.time.set_timer(SPAWNPIPE, 1200)

    floor_surface = pygame.Surface((SCREEN_WIDTH, 112))
    floor_surface.fill((222, 216, 149))
    floor_x_pos = 0

    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_SPACE and game_active:
                    bird_movement = 0
                    bird_movement += BIRD_JUMP
                if event.key == pygame.K_SPACE and not game_active:
                    game_active = True
                    pipe_list.clear()
                    bird_rect.center = (50, SCREEN_HEIGHT // 2)
                    bird_movement = 0
                    score = 0
            if event.type == SPAWNPIPE:
                pipe_list.extend(create_pipe(pipe_surface))

        screen.fill((78, 192, 202))

        if game_active:
            bird_movement += GRAVITY
            bird_rect.centery += bird_movement
            screen.blit(bird_surface, bird_rect)
            game_active = check_collision(pipe_list, bird_rect)
            pipe_list = move_pipes(pipe_list)
            draw_pipes(screen, pipe_surface, pipe_list)
            score += 0.01
            score_display(screen, game_font, score, high_score, game_active)
        else:
            high_score = update_score(score, high_score)
            score_display(screen, game_font, score, high_score, game_active)

        floor_x_pos -= 1
        draw_floor(screen, floor_surface, floor_x_pos)
        if floor_x_pos <= -SCREEN_WIDTH:
            floor_x_pos = 0

        pygame.display.update()
        clock.tick(120)

if __name__ == '__main__':
    main()