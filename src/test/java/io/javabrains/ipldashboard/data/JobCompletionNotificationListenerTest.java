package io.javabrains.ipldashboard.data;

import static org.assertj.core.api.Assertions.assertThatNoException;
import static org.junit.jupiter.params.provider.Arguments.arguments;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.atLeast;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;

import java.util.stream.Stream;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.mockito.Answers;
import org.springframework.batch.core.BatchStatus;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.test.MetaDataInstanceFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;

@SpringJUnitConfig(JobCompletionNotificationListener.class)
class JobCompletionNotificationListenerTest {

    @Autowired JobCompletionNotificationListener listener;

    @MockBean(answer = Answers.RETURNS_MOCKS)
    EntityManager entityManagerMock;

    JobExecution jobExecution;

    private static Stream<Arguments> provideNonCompletedJobStatuses() {
        return Stream.of(
                arguments(BatchStatus.ABANDONED),
                arguments(BatchStatus.FAILED),
                arguments(BatchStatus.STARTED),
                arguments(BatchStatus.STARTING),
                arguments(BatchStatus.STOPPED),
                arguments(BatchStatus.STOPPING),
                arguments(BatchStatus.UNKNOWN));
    }

    @BeforeEach
    void setUp() {
        jobExecution = MetaDataInstanceFactory.createJobExecution();
    }

    @ParameterizedTest
    @MethodSource("provideNonCompletedJobStatuses")
    void testAfterJob_whenJobNotCompleted_thenReturnsWithoutException(
            BatchStatus nonCompletedJobStatus) {
        jobExecution.setStatus(nonCompletedJobStatus);

        assertThatNoException().isThrownBy(() -> listener.afterJob(jobExecution));
        verify(entityManagerMock, never()).createQuery(anyString(), any());
    }

    @Test
    void testAfterJob_whenJobCompleted_thenVerifiesTheResults() {
        jobExecution.setStatus(BatchStatus.COMPLETED);

        listener.afterJob(jobExecution);

        verify(entityManagerMock, atLeast(3)).createQuery(anyString(), any());
    }
}
