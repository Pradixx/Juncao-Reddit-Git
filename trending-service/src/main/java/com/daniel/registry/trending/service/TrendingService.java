package com.daniel.registry.trending.service;

import com.daniel.registry.trending.dto.TrendingItemDTO;
import com.daniel.registry.trending.util.TrendingKeys;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class TrendingService {

    private final StringRedisTemplate redis;
    private final ZSetOperations<String, String> zset;

    private static final Duration DAILY_TTL = Duration.ofDays(2);
    private static final Duration WEEKLY_TTL = Duration.ofDays(21);

    public TrendingService(StringRedisTemplate redis) {
        this.redis = redis;
        this.zset = redis.opsForZSet();
    }

    public void bumpLike(long ideaId) {
        bumpScore(ideaId, 1.0);
    }

    public void bumpScore(long ideaId, double delta) {
        LocalDate today = LocalDate.now(TrendingKeys.zone());

        String dayKey = TrendingKeys.daily(today);
        String weekKey = TrendingKeys.weekly(today);

        String member = String.valueOf(ideaId);

        zset.incrementScore(dayKey, member, delta);
        zset.incrementScore(weekKey, member, delta);

        redis.expire(dayKey, DAILY_TTL);
        redis.expire(weekKey, WEEKLY_TTL);
    }

    public List<TrendingItemDTO> topDaily(LocalDate date, int limit) {
        String key = TrendingKeys.daily(date);
        return top(key, limit);
    }

    public List<TrendingItemDTO> topWeekly(LocalDate anyDateInWeek, int limit) {
        String key = TrendingKeys.weekly(anyDateInWeek);
        return top(key, limit);
    }

    private List<TrendingItemDTO> top(String key, int limit) {
        if (limit <= 0) limit = 10;

        Set<ZSetOperations.TypedTuple<String>> raw = zset.reverseRangeWithScores(key, 0, limit - 1);
        List<TrendingItemDTO> out = new ArrayList<>();
        if (raw == null) return out;

        for (ZSetOperations.TypedTuple<String> t : raw) {
            if (t == null || t.getValue() == null || t.getScore() == null) continue;
            long ideaId = Long.parseLong(t.getValue());
            out.add(new TrendingItemDTO(ideaId, t.getScore()));
        }
        return out;
    }
}
