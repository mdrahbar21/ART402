"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import paintings from "./paintings"; // ✅ Correct import

// Function to shuffle an array
const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

export default function Midsem() {
  const [shuffledIndexes, setShuffledIndexes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState({
    title: "",
    painter: "",
    year: "",
    medium: "",
  });
  const [feedback, setFeedback] = useState("");

  // Shuffle indexes when the component mounts
  useEffect(() => {
    const shuffled = shuffleArray([...Array(paintings.length).keys()]); // Generates [0,1,2,...,23] shuffled
    setShuffledIndexes(shuffled);
  }, []);

  const handleNext = () => {
    if (shuffledIndexes.length === 0) return;

    const currentPainting = paintings[shuffledIndexes[currentIndex]];

    if (
      answers.title.toLowerCase() === currentPainting.title.toLowerCase() &&
      answers.painter.toLowerCase() === currentPainting.painter.toLowerCase() &&
      answers.year === currentPainting.year &&
      answers.medium.toLowerCase() === currentPainting.medium.toLowerCase()
    ) {
      setScore((prevScore) => prevScore + 1);
      setFeedback("Correct! 🎉");
    } else {
      setFeedback(
        `Wrong! ❌ The correct answer is:\nTitle: ${currentPainting.title}\n Artist: ${currentPainting.painter}\n Year: ${currentPainting.year}\n Medium: ${currentPainting.medium}`
      );
    }

    if (currentIndex < shuffledIndexes.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setAnswers({ title: "", painter: "", year: "", medium: "" });
    } else {
      alert(`Quiz finished! Your score: ${score}/${paintings.length}`);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 mt-0 py-0">
      <h1 className="text-2xl font-bold mb-4">MODERN ART</h1>
      {shuffledIndexes.length > 0 && (
        <Card className="p-4">
          <CardContent className="flex flex-col items-center">
            <motion.img
              src={paintings[shuffledIndexes[currentIndex]].image.src}
              alt={paintings[shuffledIndexes[currentIndex]].title}
              className="w-96 h-96 rounded-lg shadow-lg mb-4"
              whileHover={{ scale: 1.05 }}
            />
            <Input
              placeholder="Title of Art"
              value={answers.title}
              onChange={(e) =>
                setAnswers({ ...answers, title: e.target.value })
              }
            />
            <Input
              placeholder="Artist's Name"
              value={answers.painter}
              onChange={(e) =>
                setAnswers({ ...answers, painter: e.target.value })
              }
            />
            <Input
              placeholder="Year of Art"
              value={answers.year}
              onChange={(e) => setAnswers({ ...answers, year: e.target.value })}
            />
            <Input
              placeholder="Medium (e.g., Oil on canvas)"
              value={answers.medium}
              onChange={(e) =>
                setAnswers({ ...answers, medium: e.target.value })
              }
            />
            <Button className="mt-2" onClick={handleNext}>
              Next
            </Button>
            {feedback && (
              <p className="mt-2 font-semibold whitespace-pre-line">
                {feedback}
              </p>
            )}
          </CardContent>
        </Card>
      )}
      <p className="mt-4">Score: {score}</p>
    </div>
  );
}
