# 우리동네 착한 밥상 (홍대편)
7천원 이하로 푸짐한 한끼를 먹을 수 있는 식당을 지도기반으로 탐색할 수 있는 웹 어플리케이션이다.

기본적으로 7천원 이하 맛집을 지도 상에 표시하며, 사용자는 필터 기능을 사용하여 다른 가격대의 음식점들도 찾아볼 수 있다. 취지상 1만원 이상의 음식점은 표시하지 않는다.

홍대 주변부터 서비스를 실시하며, 서비스 가능 지역은 차차 확장해 나갈 계획이다.
<br /><br />
# 개요
## 컨셉: 가성비 맛집 (홍대편)
- 7,000원 이하 한끼 식사 가능한 맛집
- 푸짐한 양
- 맛있는 음식
<br /><br />
# 설계
## 프론트엔드: React
- State Management: Redux (ReduxThunk)
- UI Libraries: AntD, Material-ui
## 백엔드: Node/Express
- Database: MongoDB
- Query Language: GraphQL
## APIs
- Naver Map API
- Naver Search API
## 배포 환경
- server: Heroku
- DB: mLab
<br /><br />

# 추후 발전 방향
1. ReactNative 기반 iOS/Android App 개발
2. 서울 시내 대학가 위주로 지역 추가 진행

