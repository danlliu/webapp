INSERT INTO users (username, email, password)
VALUES
    ('danlliu','danlliu@umich.edu','$argon2id$v=19$m=102400,t=2,p=8$DOH8vzdmLAVAiHGudU5p7Q$QUlqFpKy8gtegR6AVN4UOQ'),
    ('aisaav','aisaav@umich.edu','$argon2id$v=19$m=102400,t=2,p=8$7R0jZMx5j9Fa653TmvOekw$27GGMyCiSYO+UC3216RuMQ'),
    ('abifox','abifox@umich.edu','$argon2id$v=19$m=102400,t=2,p=8$AMDYW6u1VopxjnEOwfjfuw$xn6v4MAVcoPX51dVOL7Rvg'),
    ('joericha','joericha@umich.edu','$argon2id$v=19$m=102400,t=2,p=8$NUaoVarV2tu7FwIgJCTE+A$byJz9Drg/IEfopDOd+mhOg'),
    ('maximosn','maximosn@umich.edu','$argon2id$v=19$m=102400,t=2,p=8$XGuttZYSQqi1Vqq1tlbK+Q$z02M60yYJvzg7F8mKtzgnw')
    ;

INSERT INTO profiles (username, about)
VALUES
    ('danlliu', 'Hello world!'),
    ('aisaav', 'lmao'),
    ('abifox', 'tuna wizard'),
    ('joericha', null),
    ('maximosn', null)
    ;

INSERT INTO friends (user1, user2)
VALUES
    ('danlliu', 'aisaav'),
    ('aisaav', 'danlliu'),
    ('danlliu', 'joericha')
    ;