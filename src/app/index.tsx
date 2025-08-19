import { Player } from '@/widgets/player';
import "../assets/styles/all.scss";
import { getRandomElementFromArray } from '@/shared/helpers/arrays';

const urls = {
  youtube: 'https://www.youtube.com/watch?v=0r9iEuDCnrw',
  video: 'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4',
  rutube: 'https://rutube.ru/play/embed/20c1db3c9680dd6c11c5196e115389c3/',
  vk: 'https://vkvideo.ru/video-230010077_456239088',
}

const urlsArray = Object.values(urls);
const randomUrl = getRandomElementFromArray(urlsArray)

const App = () => {
  return (
    <div>
      <div>
        randomUrl
        {' '}
        {randomUrl}
      </div>

      <Player
        preview={{
          src: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRicvXHENnmfMs08gwqqleKpIFIDyYXvABiotI69IImEyfxZBXVIos5QqecafJKRFV5a76EttukpAtA0O6-y9ujsgrgpwb0TbLedjYNo38",
          alt: 'preview',
        }}
        url={randomUrl}
      />
    </div>
  )
}

export default App;
