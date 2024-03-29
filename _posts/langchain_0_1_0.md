# Langchain 0.1.x 뿌수기 (1) 달라진점

Langchain 0.1.0 이 2024년 1월 8일 정식 출시되었습니다. 

## 아키텍쳐의 변경

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/c2da3cb5-0f9f-47b3-bbdf-3b0fb8cb9a9b/30420835-b547-44df-80ef-c9d44dada4d6/Untitled.png)

판올림이 되었다고는 하지만 이전버전과 완벽하게 호환되며 Python과 JavaScript 두가지로 제공되게 됩니다. 제 생각이지만 여러 모델 프로바이더가 제공이되면서, 기존에 LLM을 호스팅하는 환경에서 Langchain등을 활용하여 개발이 이뤄졌었지만, AWS, Azure 등 기본적인 FM(파운데이션모델)을 호스팅하여 api형식으로 제공해주는 업체들이 많이 생겼기에, 파이썬 런타임을 고집할 필요가 없어졌습니다.

<aside>
💡 특정 통합과 보다 접선적인 체인은 언어별로 다를 수 있지만 핵심 추상화 및 주요 기능은 Python 및 JavaScript 패키지 모두에서 동일하게 구현됩니다.

</aside>

기존에 langchain.js가 존재하긴 했지만 아무래도, AI분야에서는 파이썬을 많이 사용하다보니 확실히 이쪽에 많은 리소스와 레퍼런스들이 있던것들이 사실입니다, 하지만 이제는 Langchain이 ML 엔지니어 뿐만 아니라 웹개발자까지 타겟으로 하면서 python과 javascript가 1:1로 매핑된 지금, 개발자는 자신이 사용하고 싶은 런타임 환경을 선택하면 됩니다.

변경점은 두가지인데요, langchain이 langchain-core와 langchain-community라는 파트너패키지로 분리되었습니다. langchain-core에는 주요 추상화, 인터페이스등이 포함되어있습니다. 기존 langchain 0.0.x 버전대의 가장큰 이슈는 업데이트마다 중요한 변경사항등에 대해 지원중단을 최소화하기위해 “모든것을 일단 유지”라는 접근방식으로 점점 무거워지며 불안정해졌습니다.

0.1.0 버전부터는 새로운 관리표준을 따르게 되었습니다.

- API에 대한 주요 변경사항이 생기는 경우 마이너 범프 (두번째 숫자)의 증가
- 버그수정이나 새로운 기능으로 인한 패치가 생기는경우 패치버전 (세번째 숫자)의 증가

때문에 향후 0.2버전이 출시된 이후에도 0.1브랜치를 유지하지만 중요한 버그수정만 패치하게됩니다.

## 타사통합

Langchain은 마이너부터 0.1.0의 릴리즈까지 약 1년간 700개 이상의 통합을 보유하게되었습니다. LLM부터 백터스토어, 에이전트에 이르기까지 LLM앱을 구축하는데 필요한 다양한 부분을 결합하는데 사용됩니다.

Langchain팀은 견고성, 안정성, 확장성과 개발자 경험을 향상시키기 위해 langchain-community 를 분할하여 중앙집중화 하였습니다. 그리고 개발통합을 자체 패키지로 분할하였고 OpenAI, Google, Mistral등을 포함하여 이 글을 쓰는 2024년 1월 16일 10개의 패키지에 대해 패키지가 분할되었습니다.

패키지의 분할이 가져오는 가장 큰 어드밴티지는 종속성관리측면에서 특정 버전을 설치하려고 할때 더이상 버전 호환의 문제를 고려할 필요가 없어졌다는것입니다. 또한 버전관리면에서 독립 실행형 패키지의 버전관리를 통해 타사통합에서 획기적인 변경이 필요한경우 이를 즉각적으로 반영할 수 있습니다.

## 옵저버빌리티

LLM을 구성할때, 시스템중앙에 비 결정적 구성요소를 배치해야 하는것이 반 필수적인데, 모델이 종종 예상불가능한 결과를 출력하는 경우를 고려하여 옵저버빌리티의 도입이 필수적입니다.

Langchain팀은 LangSmith라는 옵저버빌리티도구를 도입하였으며 진행, 입력, 출력등 각 단계에 소요되는 시간 및 데이터를 기록하고 확인 할 수 있도록 하였습니다. 아쉽게도 본 글을 작성하는 현재, LangSmith는 베타버전으로 일반사용자가 사용불가능하나, 추후 몇달안에 일반버전을 출시하므로 곧 사용해 볼 수 있을것으로 생각됩니다.

## 구성성

Langchain팀은 langchain-core의 구성요소로 LCEL(LangChain Expression Language)에 많은 투자를 하였다고 합니다. 이를 통해 커스텀된 임의 시퀀스의 구성이 가능하며 데이터 엔지니어링 파이프라인 (일괄처리, 병렬화, 대체)등에 대해 많은 이점을 제공하게 되었습니다. 앞으로 기존의 “레거시”체인을 점차 대체하므로써 더욱 간편하고 가시성있게 구성을 변경함을 목적으로 합니다.

예전에 대화형 RetrivealChain을 생성하고자 할때 다음과 같은 코드를 작성했지만

```jsx
ConversationalRetrievalChain.from_llm(llm, …)
```

앞으로는 모든 체인등이 다음과 같이 간단히 대체될 것이라고 합니다.

```jsx
create_conversational_retrieval_chain(llm, …)
```

## 스트리밍

LLM은 응답하는데 시간이 많이 소요될 수 있기때문에, 이때 빈 화면을 쳐다보는 대신 프로세스가 진행되고 있음을 알리는것이 중요합니다. 앞으로 LCEL로 구성된 모든 체인은 표준 stream과 astream을 지원하게됩니다. 

## 출력파서

LLM을 사용하여 다른 도구를 호출할 수 있도록 출력파서 개념을 도입하였습니다. 예를들어 OpenAI함수 호출을 사용할때 출력형식을 Pydantic, Json 또는 함수사용등으로 지정할 수 있습니다. 함수호출을 지원하지 않고 프롬프트를 사용하는 모델로 수행하려는경우 Json, XML, Yaml로의 인코딩도 지원합니다.

## 검색

앞에서 Langchain이 웹개발자를 타겟으로 릴리즈 되었다는 말을 잠시 했었는데, 데이터와 LLM을 쉽게 결합할 수 있는 “검색”이 추가되었습니다. 데이터와 LLM을 쉽게 결합할 수 있다는것은 매우 중요한 부분이며, 데이터의 수집(준비)와 데이터 검색 두가지 구성요소를 모두 포함하여 Langchain팀이 구축하였습니다.

수집측면에서 큰텍스트를 청크로 분할하는 프로세스를 최대한 제어할 수 있도록 최적화된 15가지의 텍스트 분할기를 구축했습니다. 또한 자주 변겨오디는 데이터에 대해 변경되지 않는 부분을 무시하며 다시 텍스트를 가져올 수 있도록 하는 인덱싱 API또한 공개했습니다.

검색측면에서 고급검색전략 (FLARE, Hyde 등..)을 구현하였고 자체쿼리와 멀티쿼리를 다른업계의 솔루션의 일부로 채택하며 여러 사용자를 위한 문서를 저장하는 사용자별 검색과 같은 생산문제를 지원하게 되었습니다.
