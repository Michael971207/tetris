using System;
using System.Collections.Generic;

class Tetromino
{
    public int[,] Shape { get; set; }
    public int X { get; set; }
    public int Y { get; set; }

    public Tetromino(int[,] shape)
    {
        Shape = shape;
        X = 4;
        Y = 0;
    }

    public void Rotate()
    {
        int[,] newShape = new int[4, 4];
        int size = Shape.GetLength(0);
        for (int i = 0; i < size; i++)
        {
            for (int j = 0; j < size; j++)
            {
                newShape[j, size - i - 1] = Shape[i, j];
            }
        }
        Shape = newShape;
    }
}

class Board
{
    private int[,] cells = new int[10, 20];
    private Tetromino currentTetromino;
    private Random random = new Random();

    public bool GameOver { get; private set; }
    public int Score { get; private set; }
    public int Level { get; private set; }

    public void Start()
    {
        GameOver = false;
        Score = 0;
        Level = 1;
        currentTetromino = GenerateRandomTetromino();
    }

    public void MoveLeft()
    {
        if (!CheckCollision(currentTetromino.Shape, currentTetromino.X - 1, currentTetromino.Y))
        {
            currentTetromino.X--;
        }
    }

    public void MoveRight()
    {
        if (!CheckCollision(currentTetromino.Shape, currentTetromino.X + 1, currentTetromino.Y))
        {
            currentTetromino.X++;
        }
    }

    public void Rotate()
    {
        Tetromino tempTetromino = new Tetromino(currentTetromino.Shape);
        tempTetromino.Rotate();
        if (!CheckCollision(tempTetromino.Shape, currentTetromino.X, currentTetromino.Y))
        {
            currentTetromino = tempTetromino;
        }
    }

    public void MoveDown()
    {
        if (!CheckCollision(currentTetromino.Shape, currentTetromino.X, currentTetromino.Y + 1))
        {
            currentTetromino.Y++;
        }
        else
        {
            AddTetrominoToBoard();
            ClearLines();
            currentTetromino = GenerateRandomTetromino();
            if (CheckCollision(currentTetromino.Shape, currentTetromino.X, currentTetromino.Y))
            {
                GameOver = true;
            }
        }
    }

    private Tetromino GenerateRandomTetromino()
    {
        int[,] shape;
        int randomIndex = random.Next(7);
        switch (randomIndex)
        {
            case 0:
                shape = new int[,] { { 1, 1 }, { 1, 1 } };
                break;
            case 1:
                shape = new int[,] { { 1, 1, 1 }, { 0, 1, 0 } };
                break;
            case 2:
                shape = new int[,] { { 1, 1
