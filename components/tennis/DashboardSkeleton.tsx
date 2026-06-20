export function DashboardSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      {/* Hero */}
      <section
        className="
        rounded-xl
        border
        border-border/60
        bg-card/60
        p-6
      "
      >
        <div className="flex justify-between items-center">
          <div className="space-y-4">
            <div
              className="
              h-3
              w-28
              rounded
              bg-muted
            "
            />

            <div
              className="
              h-16
              w-80
              rounded
              bg-muted
            "
            />

            <div
              className="
              h-4
              w-48
              rounded
              bg-muted
            "
            />

            <div className="flex gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i}>
                  <div
                    className="
                    h-3
                    w-14
                    rounded
                    bg-muted
                  "
                  />

                  <div
                    className="
                    mt-2
                    h-10
                    w-20
                    rounded
                    bg-muted
                  "
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Avatar */}

          <div
            className="
            size-32
            rounded-full
            bg-muted
          "
          />
        </div>
      </section>

      {/* H2H */}

      <section
        className="
        rounded-xl
        border
        border-border/60
        bg-card/60
        p-6
      "
      >
        <div
          className="
          h-4
          w-32
          rounded
          bg-muted
        "
        />

        <div
          className="
          mt-5
          flex
          justify-around
        "
        >
          {[1, 2].map((i) => (
            <div key={i} className="text-center">
              <div
                className="
                size-20
                rounded-full
                bg-muted
              "
              />

              <div
                className="
                mt-3
                h-4
                w-20
                rounded
                bg-muted
              "
              />
            </div>
          ))}
        </div>
      </section>

      {/* Ranking + Match */}

      <section
        className="
        grid
        gap-4
        lg:grid-cols-3
      "
      >
        <div
          className="
          lg:col-span-2
          rounded-xl
          border
          border-border/60
          bg-card/60
          p-5
        "
        >
          <div
            className="
            h-5
            w-48
            rounded
            bg-muted
          "
          />

          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="
                mt-5
                flex
                items-center
                gap-4
              "
            >
              <div
                className="
                size-8
                rounded
                bg-muted
              "
              />

              <div
                className="
                size-12
                rounded-full
                bg-muted
              "
              />

              <div
                className="
                h-4
                flex-1
                rounded
                bg-muted
              "
              />

              <div
                className="
                h-6
                w-20
                rounded
                bg-muted
              "
              />
            </div>
          ))}
        </div>

        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="
                rounded-xl
                border
                border-border/60
                bg-card/60
                p-5
              "
            >
              <div
                className="
                h-4
                w-28
                rounded
                bg-muted
              "
              />

              <div
                className="
                mt-5
                h-28
                rounded
                bg-muted
              "
              />
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}

      <section
        className="
        grid
        gap-4
        sm:grid-cols-2
        lg:grid-cols-3
      "
      >
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="
              h-32
              rounded-xl
              border
              border-border/60
              bg-card/60
            "
          />
        ))}
      </section>
    </div>
  );
}
