import sys
 
#def factorial(n):
#    if n == 0:
#        return 1
#    else:
#        return n * factorial(n-1)
# 
if __name__ == '__main__':
    num = int(sys.argv[1])  # Takes number from command line argument
#    print(factorial(num))
#    sys.stdout.flush()
#
import pygame

running=True
pygame.init()
screen = pygame.display.set_mode((200, 200))
clock = pygame.time.Clock()
c=0
while running:
    c+=1
    screen.fill((255, 255, 255))
    clock.tick(3)
    d=pygame.surfarray.pixels2d(screen)
    print(d[0][1])
    pygame.draw.rect(screen,(100,100,100),pygame.Rect(50+c, 50+c, 10, 10))
    pygame.display.update()