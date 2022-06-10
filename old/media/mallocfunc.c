#include<stdio.h>
#include<stdlib.h>

double* genArr(int n);
void getSco(double* arr, int size);
double getMin(double* arr, int size);
double getMax(double* arr, int size);
double getAvg(double* arr, int size);

int main () //5)main 함수
{
  double *arrScore; //포인터만 선언
  int arrSize;
  double scoMin, scoMax, scoAvg;

  printf("성적을 저장할 학생의 수를 입력하세요 : "); //유저에게 학생수 받음
  scanf("%d", &arrSize);

  arrScore = genArr(arrSize); //1) 정수받아 동적할당하고 시작주소 반환하는 함수
  getSco(arrScore, arrSize); //동적으로 할당받은 공간에 성적입력받는 함수
  scoMin = getMin(arrScore, arrSize); //2)최소값 반환하는 함수
  scoMax = getMax(arrScore, arrSize); //3)최댓값 반환하는 함수
  scoAvg = getAvg(arrScore, arrSize); //4)최소 최대를 제외한 평균 계산 함

  printf("성적들중 최솟값은 %.2f, 최댓값은 %.2f\n"
         "최소 최댓값을 제외한 평균은 %.2f 입니다.\n"
         , scoMin, scoMax, scoAvg);

  free(arrScore); //동적할당 받았던 arrScore 반환
  return 0;
}

double* genArr(int n)
{
  double* arr = (double *)malloc(sizeof(double) * n);
  if (arr == NULL)
  {
    printf("메모리 부족으로 동적할당 실패!!\n");
    exit(1);
  }
  return arr;
}
void getSco(double* arr, int size)
{
  int i;
  double scoTemp;
  for(i=0; i<size; i++)
  {
    printf("%d번째 학생의 점수를 입력하세요 : ", i+1);
    scanf("%lf", &scoTemp);
    getchar();
    arr[i] = scoTemp;
  }
}
double getMin(double* arr, int size)
{
  int i;
  double min = arr[0];
  for(i=1; i<size; i++)
  {
    if(min>arr[i])
    min = arr[i];
  }
  return min;
}
double getMax(double* arr, int size)
{
  int i;
  double max = arr[0];
  for(i=1; i<size; i++)
  {
    if(max<arr[i])
    max = arr[i];
  }
  return max;
}
double getAvg(double* arr, int size)
{
  int i;
  double max = -1024;
  double min = 1024;
  double sum = 0;

  for(i=0; i<size; i++)
  {
    sum += arr[i];
    if(max<arr[i])
     max = arr[i];
    if(min>arr[i])
     min = arr[i];
  }
  return (sum - min - max) / size;
}
