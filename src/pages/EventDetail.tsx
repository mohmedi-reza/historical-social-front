import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { articleContent, subEvents } from "../const/SubEvents";
import Icon from "../components/icon/icon.component";
import FloatingAudioPlayer from "../components/FloatingAudioPlayer";

const EventDetail: React.FC = () => {
  const { eventId, subEventId } = useParams<{
    eventId: string;
    subEventId: string;
  }>();
  const navigate = useNavigate();

  const validEvent = eventId && eventId in subEvents;
  const subEventList = validEvent
    ? subEvents[eventId as keyof typeof subEvents]
    : [];
  const subEventIndex = parseInt(subEventId || "0", 10);

  const hasPrevious = subEventIndex > 0;
  const hasNext = subEventIndex < subEventList.length - 1;

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      setComments([...comments, comment]);
      setComment("");
    }
  };

  if (!validEvent) {
    return <p className="text-center text-white">رویداد مورد نظر یافت نشد.</p>;
  }

  return (
    <div className="flex flex-col items-center h-screen w-screen max-w-5xl mx-auto bg-gray-900 text-white overflow-hidden relative no-scrollbar">
      <header className="w-full flex items-center p-4 border-b border-gray-700 top-0 bg-gray-900 z-20">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 border border-gray-500 text-white text-sm rounded-md hover:bg-gray-600 transition-all"
        >
          بازگشت
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-center flex-1">
            {subEventList[subEventIndex]}
          </h1>
          <p className="text-center text-gray-400 text-sm mt-2">
            عنوان رویداد: {eventId}
          </p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto w-full px-6 mt-24 pb-32 no-scrollbar space-y-11">
        <article className="text-gray-300 text-lg font-extralight leading-relaxed space-y-7">
          <img src="/public/syrus.webp" alt="" className="rounded-3xl" />
          <p>{articleContent.introduction}</p>
          <blockquote className="border-r-8 bg-slate-800 p-4 rounded-lg border-gray-500 pl-4 italic text-white font-extrabold">
            "{articleContent.quote}"
          </blockquote>
          {articleContent.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </article>

        <div className="flex items-center gap-4 mt-6">
          <button
            onClick={() => setLikes(likes + 1)}
            className="flex items-center gap-2 bg-gray-700 px-4 py-2 rounded-md hover:bg-gray-600"
          >
            👍 {likes}
          </button>
          <button
            onClick={() => setDislikes(dislikes + 1)}
            className="flex items-center gap-2 bg-gray-700 px-4 py-2 rounded-md hover:bg-gray-600"
          >
            👎 {dislikes}
          </button>
        </div>

        <div className="divider divider-start text-2xl font-extrabold">
          نظرات
        </div>

        <div className="mt-6 w-full bg-gray-50/5 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-3"></h3>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="flex-1 p-2 bg-gray-800 rounded-md outline-none text-white"
              placeholder="نظر خود را بنویسید..."
              onKeyDown={handleCommentSubmit}
            />
            <button
              onClick={handleCommentSubmit}
              className="bg-gray-700 px-4 py-2 rounded-md hover:bg-gray-600"
            >
              ارسال
            </button>
          </div>
          <ul className="space-y-2">
            {comments.length > 0 ? (
              comments.map((c, idx) => (
                <li
                  key={idx}
                  className="bg-gray-800/25 p-3 rounded-md flex gap-3 items-center font-extralight"
                >
                  <div className="avatar placeholder">
                    <div className="bg-neutral text-neutral-content w-12 rounded-full">
                      <span className="text-xs">UI</span>
                    </div>
                  </div>
                  {c}
                </li>
              ))
            ) : (
              <p className="text-gray-400">هنوز نظری ثبت نشده است.</p>
            )}
          </ul>
        </div>
      </div>

      <div className="w-full flex justify-between py-4 border-t border-gray-700 fixed bottom-0 bg-gray-900 max-w-5xl">
        <button
          onClick={() => navigate(`/event/${eventId}/${subEventIndex - 1}`)}
          disabled={!hasPrevious}
          className={`px-5 py-2 rounded-md transition-all ${
            hasPrevious
              ? "bg-gray-700 hover:bg-gray-600 text-white"
              : "bg-gray-700/50 text-gray-400 cursor-not-allowed"
          }`}
        >
          قبلی
        </button>

        <button
          onClick={() => navigate(`/event/${eventId}/${subEventIndex + 1}`)}
          disabled={!hasNext}
          className={`px-5 py-2 rounded-md transition-all ${
            hasNext
              ? "bg-gray-700 hover:bg-gray-600 text-white"
              : "bg-gray-700/50 text-gray-400 cursor-not-allowed"
          }`}
        >
          بعدی
        </button>
      </div>

      <div className="relative">
        {!isPlaying && (
          <div
            className="tooltip tooltip-right fixed bottom-16 left-6 "
            data-tip="پخش نسخه صوتی"
          >
            <button
              className=" bg-gray-700 h-14 w-14 text-white rounded-full border border-white hover:scale-110 shadow-lg hover:bg-gray-600 transition-all"
              onClick={() => setIsPlaying(true)}
            >
              <Icon name="play" />
            </button>
          </div>
        )}
      </div>
      {isPlaying && (
        <FloatingAudioPlayer
          src="/public/syrus.ogg"
          onClose={() => setIsPlaying(false)}
        />
      )}
    </div>
  );
};

export default EventDetail;
