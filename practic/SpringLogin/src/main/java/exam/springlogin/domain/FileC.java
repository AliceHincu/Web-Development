package exam.springlogin.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

import javax.persistence.*;

@Entity @Data @NoArgsConstructor @AllArgsConstructor
@EqualsAndHashCode(exclude = {"user"})
@ToString(exclude = {"user"})
public class FileC {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String filename;
    private String filepath;
    private int size;

    @JsonBackReference
    @ManyToOne
    private AppUser user;
}
